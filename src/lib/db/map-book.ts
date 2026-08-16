/**
 * Maps Drizzle book rows (with relations) to the public Book interface.
 */

import type { Book, BookImage, BookLink } from "@/lib/data/books/types"
import type {
  bookImages,
  bookLinks,
  bookReviews,
  books,
} from "./schema"

type BookRow = typeof books.$inferSelect
type BookImageRow = typeof bookImages.$inferSelect
type BookLinkRow = typeof bookLinks.$inferSelect
type BookReviewRow = typeof bookReviews.$inferSelect

export type BookWithRelations = BookRow & {
  images: BookImageRow[]
  links: BookLinkRow[]
  reviews: BookReviewRow[]
}

function mapImage(row: BookImageRow): BookImage {
  return {
    src: row.src,
    alt: row.alt,
    width: row.width,
    height: row.height,
  }
}

export function mapBook(row: BookWithRelations): Book {
  const coverRow = row.images.find((image) => image.kind === "cover")
  if (!coverRow) {
    throw new Error(`Book ${row.id} is missing a cover image`)
  }

  const previewImages = row.images
    .filter((image) => image.kind === "preview")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(mapImage)

  const links: Book["links"] = {}
  for (const link of row.links) {
    const entry: BookLink = { url: link.url, label: link.label }
    if (link.vendor === "amazon") {
      links.amazon = entry
    } else if (link.vendor === "goodreads") {
      links.goodreads = entry
    } else if (link.vendor === "internal") {
      links.internal = link.url
    }
  }

  const reviews = row.reviews
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((review) => ({
      name: review.name,
      description: review.description,
      review: review.review,
      stars: review.stars,
    }))

  const book: Book = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    category: row.category,
    featured: row.featured,
    order: row.order,
    shortDescription: row.shortDescription,
    longDescription: row.longDescription,
    cover: mapImage(coverRow),
    previewImages,
    links,
    reviews,
    availability: row.availability,
  }

  if (row.subtitle) {
    book.subtitle = row.subtitle
  }

  if (row.releaseDate) {
    book.releaseDate = row.releaseDate
  }

  if (row.contentWarnings) {
    book.contentWarnings = row.contentWarnings
  }

  if (row.isbn) {
    book.isbn = row.isbn
  }

  if (row.pageCount) {
    book.pageCount = row.pageCount
  }

  if (row.seriesName && row.seriesBook && row.seriesTotal) {
    book.seriesInfo = {
      name: row.seriesName,
      book: row.seriesBook,
      total: row.seriesTotal,
    }
  }

  return book
}
