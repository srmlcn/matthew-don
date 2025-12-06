/**
 * Skip to Content Link
 *
 * Accessibility component that allows keyboard users to skip navigation
 * and jump directly to the main content.
 */

"use client"

import Link from "next/link"
import { focusStyles } from "@/lib/theme"

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className={`
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-50
        bg-brand-secondary
        text-black
        px-4
        py-2
        rounded
        font-semibold
        ${focusStyles.ringPrimary}
      `}
    >
      Skip to content
    </Link>
  )
}
