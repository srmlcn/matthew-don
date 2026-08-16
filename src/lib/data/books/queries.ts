/**
 * Cached catalog queries backed by Neon + Drizzle.
 */

import { unstable_cache } from "next/cache"
import { asc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { mapBook } from "@/lib/db/map-book"
import { books } from "@/lib/db/schema"
import type { Book, BookCategory, BookStatus } from "./types"

export const BOOKS_CACHE_TAG = "books"

async function fetchAllBooksFromDb(): Promise<Book[]> {
  const rows = await db.query.books.findMany({
    with: {
      images: true,
      links: true,
      reviews: true,
    },
    orderBy: [asc(books.order)],
  })

  return rows.map(mapBook)
}

const getCachedAllBooks = unstable_cache(
  fetchAllBooksFromDb,
  ["catalog-all-books"],
  { tags: [BOOKS_CACHE_TAG] },
)

export async function getAllBooks(): Promise<Book[]> {
  return getCachedAllBooks()
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const row = await db.query.books.findFirst({
    where: eq(books.slug, slug),
    with: {
      images: true,
      links: true,
      reviews: true,
    },
  })

  if (!row) {
    return undefined
  }

  return mapBook(row)
}

export async function getBooksByCategory(
  category: BookCategory,
): Promise<Book[]> {
  const all = await getAllBooks()
  return all
    .filter((book) => book.category === category)
    .sort((a, b) => a.order - b.order)
}

export async function getBooksByStatus(status: BookStatus): Promise<Book[]> {
  const all = await getAllBooks()
  const filtered = all.filter((book) => book.status === status)

  if (status === "published") {
    return filtered.sort((a, b) => {
      if (!a.releaseDate || !b.releaseDate) return 0
      return b.releaseDate.getTime() - a.releaseDate.getTime()
    })
  }

  return filtered.sort((a, b) => a.order - b.order)
}

export async function getFeaturedBook(): Promise<Book | undefined> {
  const all = await getAllBooks()
  const featured = all
    .filter((book) => book.featured)
    .sort((a, b) => a.order - b.order)
  return featured[0]
}
