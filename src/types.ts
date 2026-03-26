import type { Font } from "@takumi-rs/core";

export interface RenderOptions {
  width?: number;
  height?: number;
  format?: "webp" | "png" | "jpeg";
  quality?: number;
  devicePixelRatio?: number;
  emoji?: string;
  fonts?: Font[];
}
