import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#fbf9f4",
          100: "#d7c9a5ff",
          200: "#cbbba0",
          300: "#bfae8a",
          400: "#a79774",
          500: "#8e8060",
          600: "#756a4e",
          700: "#5c533c",
          800: "#2d2d2d",
          900: "#222222",
          950: "#1a1a1a",
        },
        theme: {
          bg: "var(--bg-primary)",
          text: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          border: "var(--border-primary)",
          border2: "var(--border-secondary)",
          accent: "var(--accent-primary)",
          accentHover: "var(--accent-hover)",
          accentLight: "var(--accent-light)",
          accentText: "var(--accent-text)",
          btnExploreBg: "var(--button-explore-bg)",
          btnExploreBorder: "var(--button-explore-border)",
          btnExploreText: "var(--button-explore-text)",
          cardBg: "var(--card-bg)",
          cardBorder: "var(--card-border)",
          panelBg: "var(--panel-bg)",
          panelBorder: "var(--panel-border)",
          panelText: "var(--panel-text)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
