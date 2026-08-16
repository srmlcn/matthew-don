"use client"

import { useEffect } from "react"
import { typography } from "@/lib/theme"

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Catalog error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 px-4">
      <div className="text-center space-y-4">
        <h1 className={`${typography.heading.h1} text-error`}>
          Book Not Found
        </h1>
        <p
          className={`${typography.body.large} text-neutral-600 dark:text-neutral-400`}
        >
          We couldn't load this book. It might have been moved or removed.
        </p>
        {error.digest && (
          <p className={`${typography.body.small} text-neutral-500`}>
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-secondary text-black font-semibold rounded hover:opacity-90 transition-opacity"
        >
          Try again
        </button>

        <a
          href="/"
          className="px-6 py-3 border-2 border-brand-secondary text-brand-secondary font-semibold rounded hover:bg-brand-secondary hover:text-black transition-colors"
        >
          Browse all books
        </a>
      </div>
    </div>
  )
}
