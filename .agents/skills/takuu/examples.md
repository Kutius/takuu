# Examples

## OG Card (1200×630)

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

## GitHub Banner

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

## Product Card

```tsx
export const render = {
  width: 800,
  height: 450,
  format: "webp" as const,
};

export default function ProductCard() {
  return (
    <div tw="w-full h-full bg-white rounded-2xl p-8 flex flex-col"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <h2 tw="text-4xl font-bold text-gray-900 mb-4">Product Name</h2>
      <p tw="text-xl text-gray-600 flex-1">Brief description.</p>
      <div tw="flex items-center mt-6">
        <span tw="text-3xl font-bold text-blue-600">$29.99</span>
      </div>
    </div>
  );
}
```
