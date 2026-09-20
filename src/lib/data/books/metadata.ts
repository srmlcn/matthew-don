/**
 * Book page metadata helpers
 */

import type { Metadata } from "next"
import type { Book } from "./types"
import { getSeoOverride } from "@/lib/data/seo"

export function getBookPageTitle(book: Book): string {
  if (book.seriesInfo && book.subtitle) {
    return `${book.title}: ${book.subtitle} - Book ${book.seriesInfo.book}`
  }
  if (book.subtitle) {
    return `${book.title}: ${book.subtitle}`
  }
  return book.title
}

export async function generateBookMetadata(book: Book): Promise<Metadata> {
  const defaultTitle = getBookPageTitle(book)
  const defaultDesc = book.longDescription.join(" ")
  const defaultOgTitle = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title
  const defaultOgDesc = book.longDescription[0]
  const defaultOgImage = book.cover.src

  // Check for SEO override for this book (by slug or id)
  const override =
    (await getSeoOverride("book", book.slug)) ??
    (await getSeoOverride("book", book.id))

  const finalTitle = override?.title || defaultTitle
  const finalDesc = override?.description || defaultDesc
  const finalOgImage = override?.ogImage || defaultOgImage

  return {
    title: finalTitle,
    description: finalDesc,
    ...(override?.canonical && {
      alternates: {
        canonical: override.canonical,
      },
    }),
    ...(override?.noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title: override?.title || defaultOgTitle,
      description: override?.description || defaultOgDesc,
      images: [
        {
          url: finalOgImage,
          alt: book.cover.alt,
          width: book.cover.width,
          height: book.cover.height,
        },
      ],
    },
  }
}
