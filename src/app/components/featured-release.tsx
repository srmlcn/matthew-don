/**
 * Featured Release Component
 *
 * Highlights the latest book release with prominent styling.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"
import type { Book } from "@/lib/data/books"
import { getBookPath } from "@/lib/data/books"

interface FeaturedReleaseProps {
  book: Book
}

export function FeaturedRelease({ book }: FeaturedReleaseProps) {
  return (
    <AnimatedSection id="featured-release" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Latest Release</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {book.status === "preorder" ? "Pre-order now!" : "Available now!"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="md:w-1/3">
          <Image
            src={book.cover.src}
            alt={book.cover.alt}
            width={book.cover.width}
            height={book.cover.height}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <div>
            <h3 className="text-3xl font-bold mb-2">
              {book.title}
              {book.subtitle && `: ${book.subtitle}`}
            </h3>
            {book.seriesInfo && (
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Book {book.seriesInfo.book} of {book.seriesInfo.total}
              </p>
            )}
          </div>

          <div className="prose dark:prose-invert">
            {book.longDescription.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {book.links.amazon && (
              <LinkButton
                href={book.links.amazon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy on Amazon
              </LinkButton>
            )}
            {book.links.goodreads && (
              <LinkButton
                href={book.links.goodreads.url}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Goodreads
              </LinkButton>
            )}
            {book.status !== "upcoming" && (
              <LinkButton href={getBookPath(book)} variant="ghost">
                Learn More
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
