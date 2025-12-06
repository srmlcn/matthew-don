/**
 * Enhanced Book Page Component
 *
 * Modern book detail page with breadcrumbs, structured data, and improved layout.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import { Divider } from "@/components/ui/divider"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { getBreadcrumbs } from "@/lib/config/navigation"
import { AnimatedSection } from "@/app/components/animated-section"
import type { Book } from "@/lib/data/books"

interface EnhancedBookPageProps {
  book: Book
}

export function EnhancedBookPage({ book }: EnhancedBookPageProps) {
  const breadcrumbs = getBreadcrumbs(book.links.internal || "")
  const isMature = book.category === "comedy"

  // Generate structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.subtitle ? `${book.title}: ${book.subtitle}` : book.title,
    author: {
      "@type": "Person",
      name: "Matthew Don",
    },
    ...(book.cover && {
      image: book.cover.src,
    }),
    ...(book.isbn && {
      isbn: book.isbn,
    }),
    description: book.longDescription.join(" "),
    ...(book.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (
          book.reviews.reduce((sum, r) => sum + r.stars, 0) /
          book.reviews.length
        ).toFixed(1),
        reviewCount: book.reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    offers: book.links.amazon
      ? {
          "@type": "Offer",
          url: book.links.amazon.url,
          availability:
            book.status === "published"
              ? "https://schema.org/InStock"
              : book.status === "preorder"
              ? "https://schema.org/PreOrder"
              : "https://schema.org/PreSale",
        }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section with Book Cover and Title */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={book.cover.src}
                  alt={book.cover.alt}
                  fill
                  className="object-cover"
                  priority
                />
                {book.status === "preorder" && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Pre-order Now!
                  </div>
                )}
                {book.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Latest Release
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {book.title}
                {book.subtitle && (
                  <span className="block text-3xl md:text-4xl font-normal text-gray-600 dark:text-gray-400 mt-2">
                    {book.subtitle}
                  </span>
                )}
              </h1>
              {book.seriesInfo && (
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  Book {book.seriesInfo.book} of {book.seriesInfo.total} in{" "}
                  {book.seriesInfo.name}
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {isMature ? (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  ⚠️ Mature Audiences Only
                </span>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  🌟 Fun for All Ages!
                </span>
              )}
              {book.category === "comics" && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  📚 Comics
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              {book.longDescription.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Content Warnings */}
            {book.contentWarnings && book.contentWarnings.length > 0 && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">
                  Content Warnings:
                </p>
                <p className="text-sm text-red-700 dark:text-red-400">
                  {book.contentWarnings.join(", ")}
                </p>
              </div>
            )}

            {/* Availability */}
            {book.availability && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                {book.availability}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {book.links.amazon && (
                <LinkButton
                  href={book.links.amazon.url}
                  size="lg"
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
                  size="lg"
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
            </div>
          </div>
        </AnimatedSection>

        {/* Preview Images */}
        {book.previewImages && book.previewImages.length > 0 && (
          <>
            <Divider />
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Preview Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {book.previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Reviews */}
        {book.reviews && book.reviews.length > 0 && (
          <>
            <Divider />
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6 text-center">
                What Readers Are Saying
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.stars
                                ? "text-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {review.stars}/5
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 italic">
                      "{review.review}"
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      — {review.name}, {review.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Back to Books */}
        <Divider />
        <div className="text-center py-8">
          <LinkButton href="/#books" size="lg" variant="outline">
            ← Back to All Books
          </LinkButton>
        </div>
      </div>
    </>
  )
}
