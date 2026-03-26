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
import React from "react";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import { extractEmojis } from "@takumi-rs/helpers/emoji";
import { fetchResources } from "@takumi-rs/helpers";
import { Renderer, extractResourceUrls } from "@takumi-rs/core";
import type { EmojiType } from "@takumi-rs/helpers/emoji";
import type { Font } from "@takumi-rs/core";
import { transformSync } from "oxc-transform";
import type { RenderOptions } from "./types.ts";

const notoSansSC = readFileSync(
  resolve(import.meta.dirname, "../assets/NotoSansSC[wght].woff2"),
);

const defaultFonts: Font[] = [{ name: "Noto Sans SC", data: notoSansSC }];

function createRenderer(fonts?: Font[]) {
  return new Renderer({
    loadDefaultFonts: true,
    fonts: [...defaultFonts, ...(fonts ?? [])],
  });
}

const tmpFiles = new Set<string>();

function cleanup() {
  for (const f of tmpFiles) {
    try {
      unlinkSync(f);
    } catch {}
  }
};

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
    return { filePath: `takuu-${Date.now()}.tsx`, source };
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

export async function render(
  input: string,
  options: RenderOptions & { output?: string },
) {
  const { filePath, source } = loadSource(input);
  const code = transpile(filePath, source);

  // Write temp file to CLI's directory so all deps resolve from CLI's node_modules
  const tmpPath = resolve(
    import.meta.dirname,
    `.takumi-${randomBytes(8).toString("hex")}.mjs`,
  );
  tmpFiles.add(tmpPath);
  writeFileSync(tmpPath, code);

  let mod: Record<string, any>;
  try {
    mod = await import(pathToFileURL(tmpPath).href);
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

  const config = { ...mod.render, ...options };
  const width = config.width ?? 1200;
  const height = config.height ?? 630;
  const format = config.format ?? "webp";

  const element = React.createElement(mod.default);
  let { node, stylesheets } = await fromJsx(element);

  // Process emoji if provider is specified
  let fetchedResources;
  if (config.emoji) {
    node = extractEmojis(node, config.emoji as EmojiType);
    const urls = extractResourceUrls(node);
    if (urls.length > 0) {
      fetchedResources = await fetchResources(urls);
    }
  }

  const renderer = createRenderer(config.fonts);
  const buffer: Buffer = await renderer.render(node, {
    width,
    height,
    format,
    quality: config.quality,
    devicePixelRatio: config.devicePixelRatio,
    fetchedResources,
    stylesheets,
  });

  const output = options.output
    ? resolve(options.output)
    : `${filePath.replace(/\.[^.]+$/, "")}.${format}`;
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, buffer);

  return { output, width, height, format };
}
