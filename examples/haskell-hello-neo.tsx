export const render = {
  width: 1200,
  height: 630,
  format: "png" as const,
};

export default function HaskellHelloNeo() {
  return (
    <div
      tw="w-full h-full flex relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 15%, rgba(96, 165, 250, 0.28), transparent 28%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.18), transparent 24%), linear-gradient(135deg, #050816 0%, #0a1024 50%, #090d18 100%)",
      }}
    >
      <div
        tw="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          top: -120,
          right: -80,
          border: "1px solid rgba(125, 211, 252, 0.18)",
          boxShadow: "0 0 120px rgba(56, 189, 248, 0.12)",
        }}
      />
      <div
        tw="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          bottom: -260,
          left: -100,
          border: "1px solid rgba(196, 181, 253, 0.14)",
        }}
      />

      <div tw="relative z-10 flex w-full h-full px-16 py-14 justify-between items-center">
        <div tw="flex flex-col w-[500px] text-white">
          <div tw="flex items-center text-[18px] tracking-[0.42em] uppercase text-[#8fb5ff]">
            Lambda Hello
          </div>
          <div tw="mt-5 flex items-end">
            <div tw="text-[112px] leading-none font-bold text-white">Haskell</div>
            <div tw="ml-4 mb-5 text-[52px] text-[#7dd3fc]">λ</div>
          </div>
          <div tw="mt-6 text-[33px] leading-[1.35] text-white/85">
            Pure entry point, static types, and one very calm greeting.
          </div>

          <div tw="mt-10 flex items-center">
            <div
              tw="px-5 py-3 rounded-full text-[22px] font-semibold text-[#dbeafe]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.85), rgba(139,92,246,0.85))",
              }}
            >
              ghci Main.hs
            </div>
          </div>

          <div
            tw="mt-10 px-5 py-4 rounded-2xl border border-[#7dd3fc]/20 text-[23px] text-[#cbd5e1]"
            style={{
              background: "rgba(10, 16, 36, 0.55)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
            }}
          >
            <span tw="text-[#7dd3fc]">type</span> safety without losing elegance
          </div>
        </div>

        <div
          tw="w-[540px] rounded-[30px] overflow-hidden"
          style={{
            background: "rgba(8, 12, 26, 0.92)",
            border: "1px solid rgba(148, 163, 184, 0.16)",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.02) inset",
          }}
        >
          <div
            tw="h-16 px-6 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(17, 24, 39, 0.95))",
            }}
          >
            <div tw="flex items-center">
              <div tw="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div tw="w-3 h-3 rounded-full bg-[#febc2e] ml-3" />
              <div tw="w-3 h-3 rounded-full bg-[#28c840] ml-3" />
              <div tw="ml-5 text-[22px] text-white/75">Main.hs</div>
            </div>
            <div tw="text-[18px] text-[#7dd3fc]">stack runghc</div>
          </div>

          <div tw="px-8 py-7 font-[Geist_Mono]">
            <div tw="text-[18px] text-white/30 mb-2">-- app/Main.hs</div>

            <div tw="text-[28px] leading-[1.7]">
              <span tw="text-[#f472b6]">main</span>
              <span tw="text-[#94a3b8]"> :: </span>
              <span tw="text-[#67e8f9]">IO</span>
              <span tw="text-[#cbd5e1]"> ()</span>
            </div>

            <div tw="text-[28px] leading-[1.7]">
              <span tw="text-[#f472b6]">main</span>
              <span tw="text-[#94a3b8]"> = </span>
              <span tw="text-[#a78bfa]">putStrLn</span>
              <span tw="text-[#cbd5e1]"> </span>
              <span tw="text-[#86efac]">&quot;Hello, world!&quot;</span>
            </div>

            <div
              tw="mt-8 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(125,211,252,0.25), rgba(125,211,252,0))",
              }}
            />

            <div tw="mt-7 text-[18px] text-white/35">$ runghc Main.hs</div>
            <div tw="mt-4 text-[32px] text-[#86efac]">Hello, world!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
