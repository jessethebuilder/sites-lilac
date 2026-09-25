import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: "#1f2522",
        moss: "#415449",
        basil: "#667a45",
        tomato: "#b84637",
        paper: "#f7f1e8",
        linen: "#fffaf2",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(31, 37, 34, 0.11)",
      },
    },
  },
  plugins: [],
};

export default config;
