---
name: takuu
description: Renders React/TSX components to PNG, WebP, or JPEG images using takuu. Use when generating OG cards, social media banners, thumbnails, or any JSX-to-image task.
---

# Rendering JSX to Images

Run directly: `npx takuu render <file.tsx>`
Or install globally: `npm install -g takuu` and run `takuu render <file.tsx>`

## Workflow

```
- [ ] Write .tsx component file
- [ ] Run takuu render
- [ ] Verify output image
```

**Step 1: Write the component**

```tsx
export const render = {
  width: 1200,
  height: 630,
  format: "png",
};

export default function Card() {
  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <h1 tw="text-6xl font-bold">Title</h1>
    </div>
  );
}
```

Rules:
- `export default` a React component (required)
- `export const render` config (optional, defaults: 1200×630, webp)
- `tw` prop for Tailwind CSS classes
- `style` prop for CSS not covered by Tailwind (gradients, box-shadow)
- **Always add `flex`** — takumi v1 defaults `display` to `inline`

**Step 2: Render**

```bash
npx takuu render card.tsx
npx takuu render card.tsx -o output.png       # custom output path
npx takuu render card.tsx -w 800 -H 400 -f jpeg -q 85
echo '<div tw="w-full h-full flex bg-blue-500"/>' | npx takuu render -o out.png
```

**Step 3: Verify output**

Open or analyze the rendered image to confirm layout, colors, and text.

## Config options

| Option | Default | Values |
|---|---|---|
| `width` | 1200 | number |
| `height` | 630 | number |
| `format` | webp | png, webp, jpeg |
| `quality` | — | 0-100 (webp/jpeg) |
| `devicePixelRatio` | 1 | number |
| `emoji` | — | twemoji, blobmoji, noto, openmoji |

## Examples

See [examples.md](examples.md) for OG cards, banners, and product cards.

## CSS support

Flexbox, box model (width/height/padding/margin/border), background + gradients, text (color/size/weight/align), position (relative/absolute), opacity, overflow, box-shadow, animation keyframes.
