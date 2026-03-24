import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        sand: "#f4efe6",
        ember: "#d96c3d",
        pine: "#184d47"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
