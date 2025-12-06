/**
 * Typography Scale
 *
 * Consistent typography styles using Tailwind CSS classes.
 * Use these instead of arbitrary font sizes to maintain design consistency.
 */

export const typography = {
  // Display - Hero sections and large headings
  display: {
    large: "text-6xl font-bold", // 60px
    medium: "text-5xl font-bold", // 48px
    small: "text-4xl font-bold", // 36px
  },

  // Headings - Section and component headings
  heading: {
    h1: "text-4xl font-bold", // 36px
    h2: "text-3xl font-bold", // 30px
    h3: "text-2xl font-semibold", // 24px
    h4: "text-xl font-semibold", // 20px
    h5: "text-lg font-semibold", // 18px
    h6: "text-base font-semibold", // 16px
  },

  // Body text - Paragraphs and general content
  body: {
    large: "text-lg", // 18px
    base: "text-base", // 16px
    small: "text-sm", // 14px
    tiny: "text-xs", // 12px
  },
} as const

export type Typography = typeof typography
