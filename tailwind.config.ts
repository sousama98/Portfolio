import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: "#f5ede0",
        clay: "#d2b79e",
        ink: "#28231f",
        amber: "#f59e0b",
        teal: "#155e63",
      },
      boxShadow: {
        panel: "0 12px 40px rgba(18, 14, 10, 0.2)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.2), transparent 40%), radial-gradient(circle at 85% 80%, rgba(245,158,11,0.15), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
