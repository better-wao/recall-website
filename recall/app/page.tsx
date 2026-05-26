import Image from "next/image";
import Sky from "@/components/Sky";

export default function Page() {
  return (
    <main className="relative w-screen h-screen sky-bg sky-vignette overflow-hidden">
      {/* Drifting clouds */}
      <Sky />

      {/* Centered content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Recall logomark */}
        <div
          className="fade-in-up animate-logo-in w-full max-w-[640px] md:max-w-[760px] lg:max-w-[880px]"
        >
          <Image
            src="/recall-logo.png"
            alt="Recall"
            width={880}
            height={260}
            priority
            className="w-full h-auto select-none drop-shadow-[0_4px_24px_rgba(30,68,144,0.18)]"
          />
        </div>

        {/* Tagline — Inter Bold, 68px on desktop, scaled down responsively */}
        <p
          className="fade-in-up animate-tagline-in text-white text-center font-bold mt-10 md:mt-14 tracking-tight"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            // 68px target on desktop, scales down gracefully on mobile
            fontSize: "clamp(28px, 6.2vw, 68px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 16px rgba(30, 68, 144, 0.18)",
          }}
        >
          Coming your way soon.
        </p>
      </div>

      {/* Bottom-corner email capture — subtle, optional */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 fade-in-up animate-tagline-in">
        <a
          href="mailto:hello@recall.app?subject=Notify%20me%20when%20Recall%20launches"
          className="group inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all"
        >
          <span>Get notified at launch</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M2 12L12 2M12 2H4M12 2V10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </main>
  );
}
