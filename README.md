# takuu

JSX → Image. Render React components to images using [Takumi](https://github.com/kane50613/takumi).

## Usage

```bash
# Direct usage
npx takuu render my-card.tsx

# Or install globally
npm install -g takuu
takuu render my-card.tsx
```

```bash
# Render a component file
npx takuu render my-card.tsx

# Override output path
npx takuu render my-card.tsx -o output/hero.png

# Override dimensions
npx takuu render my-card.tsx -w 800 -H 400

# Override format and quality
npx takuu render my-card.tsx -f jpeg -q 85

# Pipe JSX from stdin
echo '<div tw="w-full h-full flex items-center bg-blue-500"/>' | npx takuu render -o out.png
```

## Component File Format

```tsx
export const render = {
  width: 1200,
  height: 630,
  format: 'png', // "png" | "webp" | "jpeg"
}

export default function OgCard() {
  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <h1 tw="text-6xl font-bold">Hello World</h1>
    </div>
  )
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
