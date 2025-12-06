/**
 * Spacing Scale
 *
 * Consistent spacing values for gaps, padding, and margins.
 * Based on Tailwind's 4px base scale.
 */

export const spacing = {
  // Component gaps - internal spacing within components
  component: {
    xs: "gap-2", // 8px
    sm: "gap-4", // 16px
    md: "gap-6", // 24px
    lg: "gap-8", // 32px
    xl: "gap-12", // 48px
  },

  // Section padding - spacing between major page sections
  section: {
    mobile: "py-16", // 64px vertical
    tablet: "py-24", // 96px vertical
    desktop: "py-32", // 128px vertical
  },

  // Container max-widths - content container sizes
  container: {
    sm: "max-w-2xl", // 672px
    md: "max-w-4xl", // 896px
    lg: "max-w-6xl", // 1152px
    xl: "max-w-7xl", // 1280px
    full: "max-w-full", // 100%
  },
} as const

export type Spacing = typeof spacing
