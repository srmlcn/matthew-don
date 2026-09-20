/**
 * Phase 1 book mutations (server actions).
 */

"use server"

import { revalidateTag, updateTag } from "next/cache"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { and, desc, eq, inArray, ne } from "drizzle-orm"
import { z } from "zod"
import { db } from "@/lib/db/client"
import { bookImages, books } from "@/lib/db/schema"
import { insertBookImageSchema, insertBookSchema } from "@/lib/db/zod"
import { BOOKS_CACHE_TAG, getBookCacheTag } from "@/lib/data/books"

export type BookActionResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

export type ReorderActionResult =
  | { ok: true; updated: number }
  | { ok: false; error: string }

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

function optionalText(max: number) {
  return z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().min(1).max(max).optional(),
  )
}

function optionalInt(min: number, max: number) {
  return z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().int().min(min).max(max).optional(),
  )
}

const bookFormSchema = z.object({
  slug: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    z.string().trim().min(1).max(200).regex(slugPattern, "Invalid slug"),
  ),
  title: z.string().trim().min(1).max(300),
  subtitle: optionalText(300),
  status: z.enum(["published", "preorder", "upcoming"]),
  category: z.enum(["adventures", "comedy", "comics"]),
  releaseDate: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
      .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date")
      .optional(),
  ),
  featured: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional().default(false),
  ),
  order: optionalInt(0, 100000),
  shortDescription: z.string().trim().min(1).max(500),
  longDescription: z.string().trim().min(1).max(20000),
  contentWarnings: optionalText(2000),
  availability: z.string().trim().min(1).max(500),
  isbn: optionalText(32),
  pageCount: optionalInt(1, 10000),
  seriesName: optionalText(300),
  seriesBook: optionalInt(1, 100),
  seriesTotal: optionalInt(1, 100),
  navSection: optionalText(300),
  coverSrc: z.string().trim().min(1).max(500),
  coverAlt: z.string().trim().min(1).max(300),
  coverWidth: optionalInt(1, 10000),
  coverHeight: optionalInt(1, 10000),
})

type BookFormData = z.infer<typeof bookFormSchema>

const reorderInputSchema = z
  .array(
    z.object({
      id: z.string().trim().min(1).max(200),
      order: z.number().int().min(0).max(100000),
    }),
  )
  .min(1)
  .max(500)

async function isAdmin(): Promise<boolean> {
  const { isAuthenticated } = getKindeServerSession()
  return (await isAuthenticated()) ?? false
}

function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "_form"
    const existing = fieldErrors[key]
    if (existing) {
      existing.push(issue.message)
    } else {
      fieldErrors[key] = [issue.message]
    }
  }
  return fieldErrors
}

function parseLongDescription(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function parseContentWarnings(raw?: string): string[] | null {
  if (!raw) {
    return null
  }
  const items = raw
    .split(/\n/)
    .map((part) => part.trim())
    .filter(Boolean)
  return items.length > 0 ? items : null
}

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false
  }
  if ("code" in error && (error as { code?: unknown }).code === "23505") {
    return true
  }
  if ("message" in error) {
    const message = String((error as { message?: unknown }).message ?? "")
    return /unique|duplicate/i.test(message)
  }
  return false
}

function revalidateBook(slug: string, oldSlug?: string): void {
  updateTag(BOOKS_CACHE_TAG)
  updateTag(getBookCacheTag(slug))
  revalidateTag(BOOKS_CACHE_TAG, "max")
  revalidateTag(getBookCacheTag(slug), "max")
  if (oldSlug && oldSlug !== slug) {
    updateTag(getBookCacheTag(oldSlug))
    revalidateTag(getBookCacheTag(oldSlug), "max")
  }
}

function revalidateSlugs(slugs: string[]): void {
  for (const slug of slugs) {
    updateTag(getBookCacheTag(slug))
    revalidateTag(getBookCacheTag(slug), "max")
  }
}

async function getMaxOrder(): Promise<number> {
  const row = await db.query.books.findFirst({
    orderBy: [desc(books.order)],
    columns: { order: true },
  })
  return row ? row.order : 0
}

async function getFeaturedSlugs(excludeId?: string): Promise<string[]> {
  const rows = await db
    .select({ id: books.id, slug: books.slug })
    .from(books)
    .where(eq(books.featured, true))
  return rows
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug)
}

export async function createBook(input: unknown): Promise<BookActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = bookFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }
  const data: BookFormData = parsed.data

  const longDescription = parseLongDescription(data.longDescription)
  if (longDescription.length === 0) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: { longDescription: ["Add at least one paragraph"] },
    }
  }

  const releaseDate = data.releaseDate ? new Date(data.releaseDate) : null
  if (releaseDate && Number.isNaN(releaseDate.getTime())) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: { releaseDate: ["Invalid date"] },
    }
  }

  const bookRow = {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle ?? null,
    status: data.status,
    category: data.category,
    releaseDate,
    featured: data.featured ?? false,
    shortDescription: data.shortDescription,
    longDescription,
    contentWarnings: parseContentWarnings(data.contentWarnings),
    availability: data.availability,
    isbn: data.isbn ?? null,
    pageCount: data.pageCount ?? null,
    seriesName: data.seriesName ?? null,
    seriesBook: data.seriesBook ?? null,
    seriesTotal: data.seriesTotal ?? null,
    navSection: data.navSection ?? null,
  }

  const bookCheck = insertBookSchema.safeParse({ ...bookRow, id: data.slug })
  if (!bookCheck.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(bookCheck.error),
    }
  }

  const coverRow = {
    kind: "cover" as const,
    src: data.coverSrc,
    alt: data.coverAlt,
    width: data.coverWidth ?? 1200,
    height: data.coverHeight ?? 1800,
    sortOrder: 0,
  }
  const coverCheck = insertBookImageSchema.safeParse({
    ...coverRow,
    bookId: data.slug,
  })
  if (!coverCheck.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(coverCheck.error),
    }
  }

  const existingSlug = await db.query.books.findFirst({
    where: eq(books.slug, data.slug),
    columns: { id: true },
  })
  if (existingSlug) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: { slug: ["Slug is already in use"] },
    }
  }

  let id = data.slug
  const existingId = await db.query.books.findFirst({
    where: eq(books.id, id),
    columns: { id: true },
  })
  if (existingId) {
    id = `${data.slug}-${Math.random().toString(36).slice(2, 8)}`
  }

  const order = data.order ?? (await getMaxOrder()) + 1
  const prevFeaturedSlugs =
    bookRow.featured === true ? await getFeaturedSlugs(id) : []

  try {
    await db.insert(books).values({ ...bookRow, id, order })
    await db.insert(bookImages).values({ ...coverRow, bookId: id })
    if (bookRow.featured === true) {
      await db
        .update(books)
        .set({ featured: false, updatedAt: new Date() })
        .where(and(ne(books.id, id), eq(books.featured, true)))
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        ok: false,
        error: "Validation failed",
        fieldErrors: { slug: ["Slug is already in use"] },
      }
    }
    throw error
  }

  revalidateBook(data.slug)
  revalidateSlugs(prevFeaturedSlugs)
  return { ok: true, id, slug: data.slug }
}

export async function updateBook(
  id: string,
  input: unknown,
): Promise<BookActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const trimmedId = id.trim()
  if (!trimmedId) {
    return { ok: false, error: "Book id is required" }
  }

  const parsed = bookFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }
  const data: BookFormData = parsed.data

  const longDescription = parseLongDescription(data.longDescription)
  if (longDescription.length === 0) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: { longDescription: ["Add at least one paragraph"] },
    }
  }

  const releaseDate = data.releaseDate ? new Date(data.releaseDate) : null
  if (releaseDate && Number.isNaN(releaseDate.getTime())) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: { releaseDate: ["Invalid date"] },
    }
  }

  const existing = await db.query.books.findFirst({
    where: eq(books.id, trimmedId),
    columns: { id: true, slug: true, order: true },
  })
  if (!existing) {
    return { ok: false, error: "Book not found" }
  }

  if (data.slug !== existing.slug) {
    const slugOwner = await db.query.books.findFirst({
      where: eq(books.slug, data.slug),
      columns: { id: true },
    })
    if (slugOwner) {
      return {
        ok: false,
        error: "Validation failed",
        fieldErrors: { slug: ["Slug is already in use"] },
      }
    }
  }

  const bookRow = {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle ?? null,
    status: data.status,
    category: data.category,
    releaseDate,
    featured: data.featured ?? false,
    order: data.order ?? existing.order,
    shortDescription: data.shortDescription,
    longDescription,
    contentWarnings: parseContentWarnings(data.contentWarnings),
    availability: data.availability,
    isbn: data.isbn ?? null,
    pageCount: data.pageCount ?? null,
    seriesName: data.seriesName ?? null,
    seriesBook: data.seriesBook ?? null,
    seriesTotal: data.seriesTotal ?? null,
    navSection: data.navSection ?? null,
    updatedAt: new Date(),
  }

  const bookCheck = insertBookSchema.safeParse({ ...bookRow, id: trimmedId })
  if (!bookCheck.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(bookCheck.error),
    }
  }

  const coverRow = {
    kind: "cover" as const,
    src: data.coverSrc,
    alt: data.coverAlt,
    width: data.coverWidth ?? 1200,
    height: data.coverHeight ?? 1800,
    sortOrder: 0,
  }
  const coverCheck = insertBookImageSchema.safeParse({
    ...coverRow,
    bookId: trimmedId,
  })
  if (!coverCheck.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(coverCheck.error),
    }
  }

  const prevFeaturedSlugs =
    bookRow.featured === true ? await getFeaturedSlugs(trimmedId) : []

  try {
    await db.update(books).set(bookRow).where(eq(books.id, trimmedId))

    const existingCover = await db.query.bookImages.findFirst({
      where: and(
        eq(bookImages.bookId, trimmedId),
        eq(bookImages.kind, "cover"),
      ),
      columns: { id: true },
    })
    if (existingCover) {
      await db
        .update(bookImages)
        .set(coverRow)
        .where(eq(bookImages.id, existingCover.id))
    } else {
      await db.insert(bookImages).values({ ...coverRow, bookId: trimmedId })
    }

    if (bookRow.featured === true) {
      await db
        .update(books)
        .set({ featured: false, updatedAt: new Date() })
        .where(and(ne(books.id, trimmedId), eq(books.featured, true)))
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        ok: false,
        error: "Validation failed",
        fieldErrors: { slug: ["Slug is already in use"] },
      }
    }
    throw error
  }

  revalidateBook(data.slug, existing.slug)
  revalidateSlugs(prevFeaturedSlugs)
  return { ok: true, id: trimmedId, slug: data.slug }
}

export async function deleteBook(id: string): Promise<BookActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const trimmedId = id.trim()
  if (!trimmedId) {
    return { ok: false, error: "Book id is required" }
  }

  const existing = await db.query.books.findFirst({
    where: eq(books.id, trimmedId),
    columns: { id: true, slug: true },
  })
  if (!existing) {
    return { ok: false, error: "Book not found" }
  }

  await db.delete(books).where(eq(books.id, trimmedId))

  revalidateBook(existing.slug)
  return { ok: true, id: existing.id, slug: existing.slug }
}

export async function reorderBooks(
  input: unknown,
): Promise<ReorderActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = reorderInputSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Invalid order payload" }
  }

  const ids = parsed.data.map((item) => item.id)
  const rows = await db
    .select({ id: books.id, slug: books.slug })
    .from(books)
    .where(inArray(books.id, ids))
  if (rows.length !== ids.length) {
    return { ok: false, error: "One or more books were not found" }
  }

  await Promise.all(
    parsed.data.map((item) =>
      db
        .update(books)
        .set({ order: item.order, updatedAt: new Date() })
        .where(eq(books.id, item.id)),
    ),
  )

  updateTag(BOOKS_CACHE_TAG)
  revalidateTag(BOOKS_CACHE_TAG, "max")
  revalidateSlugs(rows.map((row) => row.slug))
  return { ok: true, updated: parsed.data.length }
}
