# takuu

JSX → Image. Render React components to images using [Takumi](https://github.com/kane50613/takumi).

## Install

```bash
npm install -g takuu
```

## Usage

```bash
# Render a component file
takuu render my-card.tsx

# Override output path
takuu render my-card.tsx -o output/hero.png

# Override dimensions
takuu render my-card.tsx -w 800 -H 400

# Override format and quality
takuu render my-card.tsx -f jpeg -q 85

# Pipe JSX from stdin
echo '<div tw="w-full h-full flex items-center bg-blue-500"/>' | takuu render -o out.png
```

## Component File Format

```tsx
export const render = {
  width: 1200,
  height: 630,
  format: "png", // "png" | "webp" | "jpeg"
};

export default function OgCard() {
  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <h1 tw="text-6xl font-bold">Hello World</h1>
    </div>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Type check
npm run typecheck

# Test render
node dist/cli.mjs render examples/og-card.tsx
```

## License

MIT
