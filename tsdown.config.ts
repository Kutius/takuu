import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/cli.ts'],
  platform: 'node',
  format: 'cjs',
  outDir: 'dist',
  clean: true,
  banner: { js: '#!/usr/bin/env node' },
  deps: {
    neverBundle: [
      '@takumi-rs/core',
      '@takumi-rs/helpers',
      '@takumi-rs/image-response',
      'oxc-transform',
    ],
  },
})
