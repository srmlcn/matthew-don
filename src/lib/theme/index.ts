/**
 * Design System Theme
 *
 * Centralized export for all theme tokens.
 * Import from this file to access colors, typography, spacing, and animations.
 *
 * @example
 * import { colors, typography, spacing } from '@/lib/theme';
 */

export { colors, type ThemeColors } from "./colors"
export { typography, type Typography } from "./typography"
export { spacing, type Spacing } from "./spacing"
export {
  duration,
  easing,
  variants,
  transitions,
  type AnimationVariants,
  type AnimationTransitions,
} from "./animations"

// Focus styles for accessibility
export const focusStyles = {
  ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ringPrimary:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background",
  ringSecondary:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary focus-visible:ring-offset-background",
} as const
