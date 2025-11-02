import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          50: "#f8f9fb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          800: "#1f2937",
          900: "#0b0e14",
        },
        accent: {
          DEFAULT: "#ff4d2e",
          600: "#e43e22",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
} satisfies Config;
