import type { Config } from "tailwindcss"
import { heroui } from "@heroui/react"
import { colors } from "./src/lib/theme/colors"

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
        // Brand colors
        "brand-primary": colors.brand.primary.default,
        "brand-secondary": colors.brand.secondary.default,
        "brand-accent": colors.brand.accent.default,
        // Vendor colors
        amazon: colors.vendors.amazon,
        goodreads: colors.vendors.goodreads,
        instagram: colors.vendors.instagram,
        tiktok: colors.vendors.tiktok,
        // Semantic colors
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: colors.brand.primary.default,
            secondary: colors.brand.secondary.default,
          },
        },
        dark: {
          colors: {
            primary: "#ffffff",
            secondary: colors.brand.secondary.default,
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
} satisfies Config
