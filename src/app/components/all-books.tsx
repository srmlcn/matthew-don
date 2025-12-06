/**
 * All Books Component
 *
 * Displays all books in a unified, compact layout suitable for authors with fewer titles.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"
import type { Book } from "@/lib/data/books"

interface AllBooksProps {
  books: Book[]
  upcomingBooks: Book[]
}

export function AllBooks({ books, upcomingBooks }: AllBooksProps) {
  return (
    <AnimatedSection id="books" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">My Books</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          From family-friendly adventures to humorous tales for grown-ups,
          explore my collection of stories.
        </p>
      </div>

      <div className="space-y-12">
        {/* Published Books */}
        {books.map((book) => (
          <BookRow key={book.id} book={book} />
        ))}

        {/* Upcoming Books */}
        {upcomingBooks.length > 0 && (
          <>
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Coming Soon
              </h3>
            </div>
            {upcomingBooks.map((book) => (
              <BookRow key={book.id} book={book} isUpcoming />
            ))}
          </>
        )}
      </div>
    </AnimatedSection>
  )
}

function BookRow({
  book,
  isUpcoming = false,
}: {
  book: Book
  isUpcoming?: boolean
}) {
  const isMature = book.category === "comedy"

  return (
    <div
      className={`
        flex flex-col md:flex-row gap-6 p-6 rounded-xl
        ${
          isMature
            ? "bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800"
            : "bg-gray-50 dark:bg-gray-900/50"
        }
        ${isUpcoming ? "opacity-75" : ""}
      `}
    >
      {/* Book Cover */}
      <div className="md:w-48 flex-shrink-0">
        <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={book.cover.src}
            alt={book.cover.alt}
            fill
            className="object-cover"
          />
          {isUpcoming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                Coming Later...
              </span>
            </div>
          )}
          {book.status === "preorder" && (
            <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              Pre-order Now!
            </div>
          )}
          {book.featured && !isUpcoming && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
              Latest Release
            </div>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Title and Series Info */}
        <div>
          <h3 className="text-2xl font-bold">
            {book.title}
            {book.subtitle && (
              <span className="block text-xl font-normal text-gray-600 dark:text-gray-400 mt-1">
                {book.subtitle}
              </span>
            )}
          </h3>
          {book.seriesInfo && (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              Book {book.seriesInfo.book} of {book.seriesInfo.total} in{" "}
              {book.seriesInfo.name}
            </p>
          )}

          {/* Age appropriateness badge */}
          <div className="mt-2 flex flex-wrap gap-2">
            {book.category === "adventures" || book.category === "comics" ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                🌟 Fun for all ages!
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                ⚠️ Mature audiences only
              </span>
            )}
            {book.category === "comics" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                📚 Comics
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {book.longDescription.slice(0, 1).map((para, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300">
              {para}
            </p>
          ))}
        </div>

        {/* Availability */}
        {!isUpcoming && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {book.availability}
          </p>
        )}

        {/* Action Buttons */}
        {!isUpcoming && (
          <div className="flex flex-wrap gap-3 mt-auto pt-2">
            {book.links.amazon && (
              <LinkButton
                href={book.links.amazon.url}
                size="sm"
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
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read reviews of ${book.title}${
                  book.subtitle ? `: ${book.subtitle}` : ""
                } on Goodreads`}
              >
                View on Goodreads
              </LinkButton>
            )}
            {book.links.internal && (
              <LinkButton href={book.links.internal} size="sm" variant="ghost">
                Learn More
              </LinkButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
