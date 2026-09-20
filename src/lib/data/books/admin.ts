/**
 * Admin book queries (uncached, direct from Neon + Drizzle).
 */

import { asc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { books, bookReviews } from "@/lib/db/schema"
import type { BookCategory, BookStatus } from "./types"

export interface AdminBookListItem {
  id: string
  slug: string
  title: string
  subtitle: string | null
  status: BookStatus
  category: BookCategory
  releaseDate: string | null
  featured: boolean
  order: number
}

export interface AdminBookEditData extends AdminBookListItem {
  shortDescription: string
  longDescription: string[]
  contentWarnings: string[] | null
  availability: string
  isbn: string | null
  pageCount: number | null
  seriesName: string | null
  seriesBook: number | null
  seriesTotal: number | null
  navSection: string | null
  cover: {
    src: string
    alt: string
    width: number
    height: number
  } | null
}

function toDateInputValue(date: Date | null): string | null {
  if (!date) {
    return null
  }
  return date.toISOString().slice(0, 10)
}

export async function getAdminBooks(): Promise<AdminBookListItem[]> {
  const rows = await db.query.books.findMany({
    orderBy: [asc(books.order)],
    columns: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      status: true,
      category: true,
      releaseDate: true,
      featured: true,
      order: true,
    },
  })

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    status: row.status,
    category: row.category,
    releaseDate: toDateInputValue(row.releaseDate),
    featured: row.featured,
    order: row.order,
  }))
}

export interface AdminBookReviewItem {
  id: number
  bookId: string
  name: string
  description: string
  review: string
  stars: number
  sortOrder: number
  isVisible: boolean
}

export async function getAdminBookReviews(
  bookId: string,
): Promise<AdminBookReviewItem[]> {
  try {
    const rows = await db.query.bookReviews.findMany({
      where: eq(bookReviews.bookId, bookId),
      orderBy: [asc(bookReviews.sortOrder)],
    })
    return rows.map((r) => ({
      id: r.id,
      bookId: r.bookId,
      name: r.name,
      description: r.description,
      review: r.review,
      stars: r.stars,
      sortOrder: r.sortOrder,
      isVisible: r.isVisible ?? true,
    }))
  } catch {
    return []
  }
}

export async function getAdminBook(
  id: string,
): Promise<AdminBookEditData | undefined> {
  const row = await db.query.books.findFirst({
    where: eq(books.id, id),
    with: { images: true },
  })

  if (!row) {
    return undefined
  }

  const coverRow = row.images.find((image) => image.kind === "cover")

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    status: row.status,
    category: row.category,
    releaseDate: toDateInputValue(row.releaseDate),
    featured: row.featured,
    order: row.order,
    shortDescription: row.shortDescription,
    longDescription: row.longDescription,
    contentWarnings: row.contentWarnings,
    availability: row.availability,
    isbn: row.isbn,
    pageCount: row.pageCount,
    seriesName: row.seriesName,
    seriesBook: row.seriesBook,
    seriesTotal: row.seriesTotal,
    navSection: row.navSection,
    cover: coverRow
      ? {
          src: coverRow.src,
          alt: coverRow.alt,
          width: coverRow.width,
          height: coverRow.height,
        }
      : null,
  }
}
