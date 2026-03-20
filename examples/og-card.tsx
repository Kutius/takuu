export const render = {
  width: 1200,
  height: 630,
  format: "png" as const,
};

export default function OgImage() {
  return (
    <div
      tw="w-full h-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <h1 tw="text-6xl font-bold text-white mb-4">Hello from Takumi CLI</h1>
      <p tw="text-2xl text-white opacity-80">
        JSX → Image in one command
      </p>
    </div>
  );
}
