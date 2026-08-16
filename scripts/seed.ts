/**
 * Seed catalog from JSON files. Rerunnable (upserts books and replaces child rows).
 *
 * Usage: pnpm db:seed
 */

import "dotenv/config"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { eq } from "drizzle-orm"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../src/lib/db/schema"
import {
  bookImages,
  bookLinks,
  bookReviews,
  books,
} from "../src/lib/db/schema"

interface SeedBookImage {
  src: string
  alt: string
  width: number
  height: number
}

interface SeedBookLink {
  url: string
  label: string
}

interface SeedBookReview {
  name: string
  description: string
  review: string
  stars: number
}

interface SeedBook {
  id: string
  slug: string
  title: string
  subtitle?: string
  seriesInfo?: {
    name: string
    book: number
    total: number
  }
  status: "published" | "preorder" | "upcoming"
  category: "adventures" | "comedy" | "comics"
  releaseDate?: string
  featured: boolean
  order: number
  shortDescription: string
  longDescription: string[]
  contentWarnings?: string[]
  availability: string
  isbn?: string
  pageCount?: number
  cover: SeedBookImage
  previewImages: SeedBookImage[]
  links: {
    amazon?: SeedBookLink
    goodreads?: SeedBookLink
    internal?: string
  }
  reviews: SeedBookReview[]
}

function getDatabaseUrl(): string {
  const url = process.env["DATABASE_URL"]
  if (!url) {
    throw new Error("DATABASE_URL is not set")
  }
  return url
}

async function seed(): Promise<void> {
  const sql = neon(getDatabaseUrl())
  const db = drizzle(sql, { schema })

  const seedPath = join(
    process.cwd(),
    "src/lib/db/seed-data/books.json",
  )
  const seedBooks = JSON.parse(readFileSync(seedPath, "utf-8")) as SeedBook[]

  for (const book of seedBooks) {
    const releaseDate = book.releaseDate
      ? new Date(book.releaseDate)
      : undefined

    await db
      .insert(books)
      .values({
        id: book.id,
        slug: book.slug,
        title: book.title,
        subtitle: book.subtitle,
        status: book.status,
        category: book.category,
        releaseDate,
        featured: book.featured,
        order: book.order,
        shortDescription: book.shortDescription,
        longDescription: book.longDescription,
        contentWarnings: book.contentWarnings ?? null,
        availability: book.availability,
        isbn: book.isbn,
        pageCount: book.pageCount,
        seriesName: book.seriesInfo?.name,
        seriesBook: book.seriesInfo?.book,
        seriesTotal: book.seriesInfo?.total,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: books.id,
        set: {
          slug: book.slug,
          title: book.title,
          subtitle: book.subtitle,
          status: book.status,
          category: book.category,
          releaseDate,
          featured: book.featured,
          order: book.order,
          shortDescription: book.shortDescription,
          longDescription: book.longDescription,
          contentWarnings: book.contentWarnings ?? null,
          availability: book.availability,
          isbn: book.isbn,
          pageCount: book.pageCount,
          seriesName: book.seriesInfo?.name,
          seriesBook: book.seriesInfo?.book,
          seriesTotal: book.seriesInfo?.total,
          updatedAt: new Date(),
        },
      })

    await db.delete(bookImages).where(eq(bookImages.bookId, book.id))
    await db.delete(bookLinks).where(eq(bookLinks.bookId, book.id))
    await db.delete(bookReviews).where(eq(bookReviews.bookId, book.id))

    await db.insert(bookImages).values({
      bookId: book.id,
      kind: "cover",
      src: book.cover.src,
      alt: book.cover.alt,
      width: book.cover.width,
      height: book.cover.height,
      sortOrder: 0,
    })

    for (const [index, preview] of book.previewImages.entries()) {
      await db.insert(bookImages).values({
        bookId: book.id,
        kind: "preview",
        src: preview.src,
        alt: preview.alt,
        width: preview.width,
        height: preview.height,
        sortOrder: index,
      })
    }

    const linkRows: Array<{
      bookId: string
      vendor: "amazon" | "goodreads" | "internal"
      url: string
      label: string
    }> = []

    if (book.links.amazon) {
      linkRows.push({
        bookId: book.id,
        vendor: "amazon",
        url: book.links.amazon.url,
        label: book.links.amazon.label,
      })
    }

    if (book.links.goodreads) {
      linkRows.push({
        bookId: book.id,
        vendor: "goodreads",
        url: book.links.goodreads.url,
        label: book.links.goodreads.label,
      })
    }

    if (book.links.internal) {
      linkRows.push({
        bookId: book.id,
        vendor: "internal",
        url: book.links.internal,
        label: book.links.internal,
      })
    }

    if (linkRows.length > 0) {
      await db.insert(bookLinks).values(linkRows)
    }

    for (const [index, review] of book.reviews.entries()) {
      await db.insert(bookReviews).values({
        bookId: book.id,
        name: review.name,
        description: review.description,
        review: review.review,
        stars: review.stars,
        sortOrder: index,
      })
    }

    console.log(`Seeded book: ${book.id}`)
  }

  console.log(`Seeded ${seedBooks.length} books`)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
