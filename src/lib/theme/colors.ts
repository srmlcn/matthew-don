/**
 * Theme Colors
 *
 * Centralized color palette for the application.
 * All colors should be referenced from this file to maintain consistency.
 */

export const colors = {
  // Brand colors
  brand: {
    primary: {
      default: "#171717",
      hover: "#262626",
      active: "#404040",
    },
    secondary: {
      default: "#00ff77",
      hover: "#00e66d",
      active: "#00cc63",
    },
    accent: {
      default: "#FF6B6B",
      hover: "#FF5252",
      active: "#FF3838",
    },
  },

  // Semantic colors
  semantic: {
    success: "#00ff77",
    warning: "#FFA500",
    error: "#FF3838",
    info: "#3B82F6",
  },

  // Vendor colors
  vendors: {
    amazon: "#febd69",
    goodreads: "#553b08",
    instagram: "#E4405F",
    tiktok: "#000000",
  },

  // UI colors - Neutral scale
  neutral: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
} as const

export type ThemeColors = typeof colors
