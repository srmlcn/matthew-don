import type { Config } from "tailwindcss"
import { heroui } from "@heroui/react"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        amazon: "#febd69",
        goodreads: "#553b08",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#171717",
            secondary: "#00ff77",
          },
        },
        dark: {
          colors: {
            primary: "#ffffff",
            secondary: "#00ff77",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
} satisfies Config
