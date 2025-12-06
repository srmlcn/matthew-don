/**
 * Divider Component
 *
 * A simple horizontal or vertical divider.
 */

import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface DividerProps {
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function Divider({
  orientation = "horizontal",
  className,
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-gray-200 dark:bg-gray-800"
          : "w-px h-full bg-gray-200 dark:bg-gray-800",
        className
      )}
    />
  )
}
