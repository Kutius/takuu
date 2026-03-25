export const render = {
  width: 1200,
  height: 630,
  format: "png" as const,
};

const code = `main :: IO ()
main = putStrLn "Hello, world!"`;

export default function HaskellHello() {
  return (
    <div
      tw="w-full h-full flex"
      style={{
        background:
          "radial-gradient(circle at top left, #2f4f8f 0%, #1b2a52 35%, #0b1020 100%)",
      }}
    >
      <div tw="flex w-full h-full px-18 py-14 items-center justify-between">
        <div tw="flex flex-col max-w-[480px] text-white">
          <div tw="text-[22px] tracking-[0.35em] uppercase opacity-70">
            Functional Hello World
          </div>
          <h1 tw="text-[96px] leading-none font-bold mt-6 mb-4">Haskell</h1>
          <p tw="text-[34px] leading-snug opacity-90">
            A tiny pure program, rendered like a polished terminal card.
          </p>
          <div tw="mt-10 flex items-center">
            <div tw="px-5 py-3 rounded-full text-[24px] font-semibold bg-[#5e83ff] text-white">
              ghci
            </div>
            <div tw="ml-4 text-[24px] opacity-75">
              compile calm, print clearly
            </div>
          </div>
        </div>

        <div
          tw="flex flex-col w-[500px] min-h-[340px] rounded-[28px] border border-white/12 overflow-hidden"
          style={{
            background: "rgba(7, 12, 24, 0.78)",
            boxShadow: "0 28px 90px rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div tw="flex items-center h-16 px-6 bg-white/8">
            <div tw="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div tw="w-3 h-3 rounded-full bg-[#febc2e] ml-3" />
            <div tw="w-3 h-3 rounded-full bg-[#28c840] ml-3" />
            <div tw="ml-5 text-[22px] text-white/70 font-medium">
              Main.hs
            </div>
          </div>

          <div tw="px-8 py-8 text-[#d6e3ff] font-[Geist_Mono]">
            <div tw="text-[28px] leading-[1.7] whitespace-pre-wrap">{code}</div>
            <div tw="mt-10 text-[26px] text-[#8ccf7e]">
              Hello, world!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
