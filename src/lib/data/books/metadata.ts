/**
 * Book page metadata helpers
 */

import type { Metadata } from "next"
import type { Book } from "./types"

export function getBookPageTitle(book: Book): string {
  if (book.seriesInfo && book.subtitle) {
    return `${book.title}: ${book.subtitle} - Book ${book.seriesInfo.book}`
  }
  if (book.subtitle) {
    return `${book.title}: ${book.subtitle}`
  }
  return book.title
}

export function generateBookMetadata(book: Book): Metadata {
  const pageTitle = getBookPageTitle(book)

  return {
    title: pageTitle,
    description: book.longDescription.join(" "),
    openGraph: {
      title: book.subtitle ? `${book.title}: ${book.subtitle}` : book.title,
      description: book.longDescription[0],
      images: [
        {
          url: book.cover.src,
          alt: book.cover.alt,
          width: book.cover.width,
          height: book.cover.height,
        },
      ],
    },
  }
}
