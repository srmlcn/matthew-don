import { typography } from "@/lib/theme"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 px-4">
      <div className="text-center space-y-4">
        <h1
          className={`${typography.display.medium} text-brand-primary dark:text-white`}
        >
          404
        </h1>
        <h2
          className={`${typography.heading.h2} text-neutral-600 dark:text-neutral-400`}
        >
          Page Not Found
        </h2>
        <p
          className={`${typography.body.large} text-neutral-600 dark:text-neutral-400`}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-3 bg-brand-secondary text-black font-semibold rounded hover:opacity-90 transition-opacity"
      >
        Return to home page
      </Link>
    </div>
  )
}
