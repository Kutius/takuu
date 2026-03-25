import { resolve, dirname, extname } from "node:path";
import {
  writeFileSync,
  readFileSync,
  mkdirSync,
  unlinkSync,
  existsSync,
} from "node:fs";
import { pathToFileURL } from "node:url";
import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import React from "react";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import { extractEmojis } from "@takumi-rs/helpers/emoji";
import { fetchResources } from "@takumi-rs/helpers";
import { Renderer, extractResourceUrls } from "@takumi-rs/core";
import type { EmojiType } from "@takumi-rs/helpers/emoji";
import { transformSync } from "oxc-transform";
import type { ComponentModule, RenderOptions } from "./types.ts";

const renderer = new Renderer();

const tmpFiles = new Set<string>();

function cleanup() {
  for (const f of tmpFiles) {
    try {
      unlinkSync(f);
    } catch {}
  }
}

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

function loadSource(input: string): { filePath: string; source: string } {
  if (input === "-") {
    let source = readFileSync(0, "utf-8").trim();
    if (!source.includes("export")) {
      source = `export default function App() { return (${source}); }`;
    }
    return { filePath: resolve(`takuu-${Date.now()}.tsx`), source };
  }
  const filePath = resolve(input);
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return { filePath, source: readFileSync(filePath, "utf-8") };
}

function transpile(filePath: string, source: string): string {
  const { code } = transformSync(filePath, source, {
    jsx: { runtime: "automatic", importSource: "react" },
    typescript: {},
    sourceType: "module",
  });
  return code;
}

// Rewrite bare import specifiers to absolute paths so the temp file
// can be placed anywhere (critical for global/npx installs)
function rewriteImports(code: string): string {
  const req = createRequire(require.resolve("@takumi-rs/core"));
  return code.replace(
    /from\s+["']([^"']+)["']/g,
    (match, specifier) => {
      if (specifier.startsWith(".") || specifier.startsWith("/")) return match;
      try {
        return `from "${req.resolve(specifier)}"`;
      } catch {
        return match;
      }
    },
  );
}

function resolveOutputPath(
  inputPath: string,
  format: string,
  options: RenderOptions,
): string {
  if (options.output) return resolve(options.output);
  const baseName = extname(inputPath)
    ? inputPath.slice(0, -extname(inputPath).length)
    : inputPath;
  return `${baseName}.${format}`;
}

export async function render(input: string, options: RenderOptions) {
  const { filePath, source } = loadSource(input);
  const code = rewriteImports(transpile(filePath, source));

  const srcDir = dirname(filePath);
  const tmpPath = resolve(
    srcDir,
    `.takumi-${randomBytes(8).toString("hex")}.mjs`,
  );
  tmpFiles.add(tmpPath);
  writeFileSync(tmpPath, code);

  let mod: ComponentModule;
  try {
    mod = (await import(pathToFileURL(tmpPath).href)) as ComponentModule;
  } catch (e) {
    throw new Error(
      `Failed to load component from ${filePath}:\n${(e as Error).message}`,
    );
  } finally {
    tmpFiles.delete(tmpPath);
    unlinkSync(tmpPath);
  }

  if (!mod.default || typeof mod.default !== "function") {
    throw new Error(
      `${filePath} must export a default React component (function)`,
    );
  }

  const cleanOptions = Object.fromEntries(
    Object.entries(options).filter(([, v]) => v !== undefined),
  );
  const config = { ...mod.render, ...cleanOptions };
  const width = config.width ?? 1200;
  const height = config.height ?? 630;
  const format = config.format ?? "webp";
  const quality = config.quality;
  const devicePixelRatio = config.devicePixelRatio;
  const emoji = config.emoji;

  const Component = mod.default;
  const element = React.createElement(Component);
  let { node, stylesheets } = await fromJsx(element);

  // Process emoji if provider is specified
  let fetchedResources;
  if (emoji) {
    node = extractEmojis(node, emoji as EmojiType);
    const resourceUrls = extractResourceUrls(node);
    if (resourceUrls.length > 0) {
      fetchedResources = await fetchResources(resourceUrls);
    }
  }

  const buffer: Buffer = await renderer.render(node, {
    width,
    height,
    format,
    quality,
    devicePixelRatio,
    fetchedResources,
    stylesheets,
  });

  const outputPath = resolveOutputPath(filePath, format, options);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, buffer);

  return { outputPath, width, height, format };
}
