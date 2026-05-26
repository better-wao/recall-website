import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sky palette — sampled from the brand image, extended for depth
        sky: {
          top: "#7AB5F5",      // higher altitude, slightly deeper
          mid: "#5EA0F2",      // matches the screenshot midtone
          low: "#8FC0F5",      // lower, hazier
          haze: "#B8D4F5",     // horizon haze
        },
      },
      fontFamily: {
        // Inter for the tagline (user-specified), Inter as system default too
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Each cloud drifts at its own pace for parallax depth
        "drift-slow":    "drift 90s linear infinite",
        "drift-medium":  "drift 65s linear infinite",
        "drift-fast":    "drift 45s linear infinite",
        "drift-slowest": "drift 120s linear infinite",
        "logo-in":       "logoIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "tagline-in":    "taglineIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
      },
      keyframes: {
        drift: {
          "0%":   { transform: "translateX(-20vw)" },
          "100%": { transform: "translateX(120vw)" },
        },
        logoIn: {
          "0%":   { opacity: "0", transform: "translateY(20px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        taglineIn: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
