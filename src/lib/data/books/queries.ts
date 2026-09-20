/**
 * Cached catalog queries backed by Neon + Drizzle.
 */

import { unstable_cache } from "next/cache"
import { asc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { mapBook, hydrateBook } from "@/lib/db/map-book"
import { books } from "@/lib/db/schema"
import type { Book, BookCategory, BookStatus } from "./types"

export const BOOKS_CACHE_TAG = "books"

export function getBookCacheTag(slug: string): string {
  return `book:${slug}`
}

async function fetchAllBooksFromDb(): Promise<Book[]> {
  try {
    const rows = await db.query.books.findMany({
      with: {
        images: true,
        links: true,
        reviews: true,
      },
      orderBy: [asc(books.order)],
    })

    return rows.map(mapBook)
  } catch {
    try {
      const { readFileSync } = await import("node:fs")
      const { join } = await import("node:path")
      const seedPath = join(process.cwd(), "src/lib/db/seed-data/books.json")
      const raw = readFileSync(seedPath, "utf-8")
      const seedBooks = JSON.parse(raw) as Array<Record<string, unknown>>
      return seedBooks.map((b) => ({
        ...b,
        releaseDate: b["releaseDate"] ? new Date(b["releaseDate"] as string) : undefined,
      })) as unknown as Book[]
    } catch {
      return []
    }
  }
}

const getCachedAllBooks = unstable_cache(
  fetchAllBooksFromDb,
  ["catalog-all-books"],
  { tags: [BOOKS_CACHE_TAG] },
)

export async function getAllBooks(): Promise<Book[]> {
  const books = await getCachedAllBooks()
  return books.map(hydrateBook)
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const getCachedBook = unstable_cache(
    () => fetchBookBySlugFromDb(slug),
    ["catalog-book", slug],
    { tags: [BOOKS_CACHE_TAG, getBookCacheTag(slug)] },
  )
  const book = await getCachedBook()
  return book ? hydrateBook(book) : undefined
}

async function fetchBookBySlugFromDb(
  slug: string,
): Promise<Book | undefined> {
  try {
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
  } catch {
    try {
      const all = await fetchAllBooksFromDb()
      return all.find((b) => b.slug === slug)
    } catch {
      return undefined
    }
  }
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
