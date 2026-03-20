import type { ComponentType } from "react";
import type { Font } from "@takumi-rs/core";

export interface RenderConfig {
  width?: number;
  height?: number;
  format?: "webp" | "png" | "jpeg";
  quality?: number;
  devicePixelRatio?: number;
  emoji?: string;
}

export interface ComponentModule {
  default: ComponentType;
  render?: RenderConfig;
}

export interface RenderOptions {
  output?: string;
  width?: number;
  height?: number;
  format?: "webp" | "png" | "jpeg";
  quality?: number;
  devicePixelRatio?: number;
  emoji?: string;
  fonts?: Font[];
}
