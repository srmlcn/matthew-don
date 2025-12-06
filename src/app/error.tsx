"use client"

import { useEffect } from "react"
import { typography } from "@/lib/theme"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console in development
    // In production, you might want to log to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 px-4">
      <div className="text-center space-y-4">
        <h1 className={`${typography.heading.h1} text-error`}>
          Oops! Something went wrong
        </h1>
        <p
          className={`${typography.body.large} text-neutral-600 dark:text-neutral-400`}
        >
          We're sorry, but something unexpected happened.
        </p>
        {error.digest && (
          <p className={`${typography.body.small} text-neutral-500`}>
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <button
        onClick={reset}
        className="px-6 py-3 bg-brand-secondary text-black font-semibold rounded hover:opacity-90 transition-opacity"
      >
        Try again
      </button>

      <a href="/" className="text-brand-secondary hover:underline">
        Return to home page
      </a>
    </div>
  )
}
