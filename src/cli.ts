import cac from "cac";
import pc from "picocolors";
import { render } from "./render.ts";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Font } from "@takumi-rs/core";

const pkg = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../package.json"), "utf-8"),
);

const cli = cac("takuu");

cli.version(pkg.version);

cli
  .command("render [input]", "Render a TSX/JSX component to an image")
  .option("-o, --output <path>", "Output file path")
  .option("-w, --width <number>", "Image width")
  .option("-H, --height <number>", "Image height")
  .option("-f, --format <format>", "Image format (webp, png, jpeg)")
  .option("-q, --quality <number>", "Image quality (0-100)")
  .option("--dpr <number>", "Device pixel ratio")
  .option(
    "--emoji <provider>",
    "Emoji provider (twemoji, blobmoji, noto, openmoji)",
  )
  .option("--fonts <paths...>", "Custom font files (.ttf/.woff2)")
  .action(
    async (
      input: string | undefined,
      opts: {
        output?: string;
        width?: string;
        height?: string;
        format?: string;
        quality?: string;
        dpr?: string;
        emoji?: string;
        fonts?: string[];
      },
    ) => {
      try {
        // Read from stdin if no input given
        if (!input) {
          if (process.stdin.isTTY) {
            console.error(
              pc.red("✗") +
                " No input file. Usage: takuu render <file.tsx>",
            );
            process.exit(1);
          }
          input = "-";
        }

        // Resolve fonts
        let fonts: Font[] | undefined;
        if (opts.fonts) {
          const paths = Array.isArray(opts.fonts) ? opts.fonts : [opts.fonts];
          fonts = paths.map((p: string) => {
            const fp = resolve(p);
            if (!existsSync(fp)) {
              throw new Error(`Font file not found: ${fp}`);
            }
            // return {
            //   name: "",
            //   data: readFileSync(fp),
            //   weight: 400,
            //   style: "normal" as const,
            // };
            return readFileSync(fp);
          });
        }

        const start = performance.now();
        const { outputPath, width, height, format } = await render(input, {
          output: opts.output,
          width: opts.width ? Number(opts.width) : undefined,
          height: opts.height ? Number(opts.height) : undefined,
          format: opts.format as "webp" | "png" | "jpeg" | undefined,
          quality: opts.quality ? Number(opts.quality) : undefined,
          devicePixelRatio: opts.dpr ? Number(opts.dpr) : undefined,
          emoji: opts.emoji || undefined,
          fonts,
        });
        const ms = (performance.now() - start).toFixed(0);

        console.log(
          pc.green("✓") +
            ` ${pc.bold(`${width}×${height}`)} ${pc.dim(format)}` +
            ` ${pc.dim("→")} ${outputPath}` +
            pc.dim(` (${ms}ms)`),
        );
      } catch (e) {
        console.error(pc.red("✗") + ` ${(e as Error).message}`);
        process.exit(1);
      }
    },
  );

cli.help();
cli.parse();
