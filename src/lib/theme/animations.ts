/**
 * Animation Presets
 *
 * Consistent animation configurations for Framer Motion and CSS transitions.
 * Use these presets to maintain consistent timing and easing across the site.
 */

import type { Variants } from "framer-motion"

// Duration constants (in seconds)
export const duration = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const

// Easing functions
export const easing = {
  easeOut: [0.0, 0.0, 0.2, 1.0],
  easeIn: [0.4, 0.0, 1.0, 1.0],
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const

// Common animation variants for Framer Motion
export const variants = {
  // Fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  } as Variants,

  // Slide down
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  } as Variants,

  // Slide left
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  } as Variants,

  // Slide right
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  } as Variants,

  // Scale
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  } as Variants,
} as const

// Transition configurations
export const transitions = {
  default: {
    duration: duration.normal,
    ease: easing.easeOut,
  },
  fast: {
    duration: duration.fast,
    ease: easing.easeOut,
  },
  slow: {
    duration: duration.slow,
    ease: easing.easeOut,
  },
  spring: easing.spring,
} as const

export type AnimationVariants = typeof variants
export type AnimationTransitions = typeof transitions
