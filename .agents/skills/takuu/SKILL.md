# Skill: takuu

# JSX → Image Rendering

Render React components to images (PNG, WebP, JPEG) using `takuu`.

## When to Use This Skill

Use this skill when the user asks to:
- Generate an Open Graph (OG) image or social media card
- Create a banner, thumbnail, or marketing image
- Render a JSX/TSX component to a static image
- Generate placeholder or dynamic images from code

## Prerequisites

`takuu` must be installed:

```bash
npm install -g takuu
# or use npx
npx takuu render <file>
```

## How It Works

1. Write a `.tsx` file that exports a React component as `default`
2. Optionally export a `render` config object with `width`, `height`, `format`
3. Run `takuu render <file.tsx>` to output the image

## Component File Format

```tsx
// output-card.tsx
export const render = {
  width: 1200,
  height: 630,
  format: "png", // "png" | "webp" | "jpeg"
  quality: 90,   // optional, for webp/jpeg
};

export default function MyCard() {
  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <h1 tw="text-6xl font-bold">Hello World</h1>
    </div>
  );
}
```

### Key Rules

- The file **must** export a `default` React component (function)
- The `render` config is optional (defaults: 1200×630, webp)
- Use Tailwind CSS classes via the `tw` prop (e.g., `tw="text-2xl font-bold"`)
- Use `style` prop for inline CSS (gradients, custom colors, etc.)
- **Always add `flex` explicitly** — v1 defaults `display` to `inline`, not `flex`

## CLI Usage

```bash
# Basic render (uses file config)
takuu render my-card.tsx

# Override output path
takuu render my-card.tsx -o output/hero.png

# Override dimensions (-H for height, -h is help)
takuu render my-card.tsx -w 800 -H 400

# Override format
takuu render my-card.tsx -f jpeg -q 85

# Pipe JSX from stdin (must include flex explicitly)
echo '<div tw="w-full h-full flex items-center bg-red-500"/>' | takuu render -o out.png

# With custom font
takuu render my-card.tsx --fonts ./MyFont.ttf
```

## Common Patterns

### OG Card (1200×630)

```tsx
export const render = {
  width: 1200,
  height: 630,
  format: "png" as const,
};

export default function OgCard({ title = "My Site" }: { title?: string }) {
  return (
    <div
      tw="w-full h-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <h1 tw="text-6xl font-bold text-white mb-4">{title}</h1>
      <p tw="text-2xl text-white opacity-80">Built with Takumi</p>
    </div>
  );
}
```

### GitHub Profile Banner

```tsx
export const render = {
  width: 1280,
  height: 640,
  format: "webp" as const,
};

export default function Banner() {
  return (
    <div tw="w-full h-full flex items-center px-16" style={{ background: "#0d1117" }}>
      <div tw="flex flex-col">
        <h1 tw="text-7xl font-bold text-white">John Doe</h1>
        <p tw="text-3xl text-gray-400 mt-4">Full-stack Developer</p>
      </div>
    </div>
  );
}
```

### Card with Image

```tsx
export const render = {
  width: 800,
  height: 450,
  format: "webp" as const,
};

export default function ProductCard() {
  return (
    <div tw="w-full h-full bg-white rounded-2xl p-8 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <h2 tw="text-4xl font-bold text-gray-900 mb-4">Product Name</h2>
      <p tw="text-xl text-gray-600 flex-1">A brief description of the product goes here.</p>
      <div tw="flex items-center mt-6">
        <span tw="text-3xl font-bold text-blue-600">$29.99</span>
      </div>
    </div>
  );
}
```

## Supported CSS Properties

Takumi supports a subset of CSS via its Rust layout engine:
- Flexbox (`display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap`, etc.)
- `width`, `height`, `padding`, `margin`, `border`, `border-radius`
- `background`, `background-image` (gradients)
- `color`, `font-size`, `font-weight`, `font-family`, `text-align`
- `position` (relative, absolute), `top`, `left`, `right`, `bottom`
- `opacity`, `overflow`, `box-shadow`

## Tips

- Keep component trees simple for best performance
- Use `style` for CSS properties not available as Tailwind classes (like gradients)
- Default fonts include Geist and Geist Mono; custom fonts require loading via the `Renderer`
- For images within components, use remote URLs (fetched at render time)
- Run `takuu render --help` for all CLI options
