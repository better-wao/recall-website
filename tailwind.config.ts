import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sky palette — sampled from the brand image
        sky: {
          top:  "#7AB5F5",
          mid:  "#5EA0F2",
          low:  "#8FC0F5",
          haze: "#B8D4F5",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Entrance animations only — cloud drift lives in globals.css
        // because its keyframes are tightly coupled to the layered cloud DOM.
        "logo-in":    "logoIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "tagline-in": "taglineIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
      },
      keyframes: {
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
