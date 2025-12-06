/**
 * Book Card Component
 *
 * Individual book card with cover, title, and action buttons.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import type { Book } from "@/lib/data/books"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="relative aspect-[2/3] bg-gray-100 dark:bg-gray-800">
        <Image
          src={book.cover.src}
          alt={book.cover.alt}
          fill
          className="object-cover"
        />
        {book.status === "upcoming" && (
          <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Coming Soon
          </div>
        )}
        {book.status === "preorder" && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Pre-order Now
          </div>
        )}
        {book.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
            New Release
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">
            {book.title}
            {book.subtitle && (
              <span className="block text-lg font-normal text-gray-600 dark:text-gray-400">
                {book.subtitle}
              </span>
            )}
          </h3>
          {book.seriesInfo && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Book {book.seriesInfo.book} of {book.seriesInfo.total}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">
          {book.shortDescription}
        </p>

        {book.contentWarnings && book.contentWarnings.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
            <p className="text-xs font-semibold text-red-800 dark:text-red-300">
              Content Warning: {book.contentWarnings.join(", ")}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          {book.links.internal && book.status !== "upcoming" && (
            <LinkButton href={book.links.internal} size="sm">
              Learn More
            </LinkButton>
          )}
          {book.links.amazon && (
            <LinkButton
              href={book.links.amazon.url}
              size="sm"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy ${book.title}${
                book.subtitle ? `: ${book.subtitle}` : ""
              } on Amazon`}
            >
              Buy on Amazon
            </LinkButton>
          )}
          {book.links.goodreads && (
            <LinkButton
              href={book.links.goodreads.url}
              size="sm"
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read reviews of ${book.title}${
                book.subtitle ? `: ${book.subtitle}` : ""
              } on Goodreads`}
            >
              View on Goodreads
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}
