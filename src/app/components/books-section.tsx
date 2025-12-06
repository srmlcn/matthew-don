/**
 * Books Section Component
 *
 * Organizes books by series/category with clear visual hierarchy.
 */

import * as React from "react"
import { BookCard } from "./book-card"
import { AnimatedSection } from "./animated-section"
import type { Book } from "@/lib/data/books"

interface BooksSectionProps {
  title: string
  description?: string
  books: Book[]
  id?: string
  variant?: "adventure" | "mature" | "upcoming"
}

export function BooksSection({
  title,
  description,
  books,
  id,
  variant = "adventure",
}: BooksSectionProps) {
  const variantStyles = {
    adventure: "bg-blue-50 dark:bg-blue-950/20",
    mature:
      "bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800",
    upcoming: "bg-gray-50 dark:bg-gray-900/50",
  }

  return (
    <AnimatedSection id={id} className="py-12">
      <div className={`rounded-2xl p-8 ${variantStyles[variant]}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {variant === "mature" && (
            <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
              ⚠️ Intended for mature audiences
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
