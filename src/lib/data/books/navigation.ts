/**
 * Book navigation helpers
 *
 * Derives URLs, labels, and nav sections from catalog records.
 */

import type { NavItem, NavSection } from "@/lib/config/navigation"
import { getAllBooks } from "./queries"
import type { Book } from "./types"

const LUCA_KAI_SERIES = "The Adventures of Luca and Kai"

export function getBookPath(book: Book): string {
  return book.category === "comics"
    ? `/comics/${book.slug}`
    : `/books/${book.slug}`
}

export function getBookNavLabel(book: Book): string {
  if (book.subtitle && book.seriesInfo) {
    return `${book.subtitle} (Book ${book.seriesInfo.book})`
  }
  if (book.subtitle) {
    return book.subtitle
  }
  return book.title
}

export function resolveBookNavSection(book: Book): string | null {
  if (book.status === "upcoming") {
    return null
  }

  if (book.navSection !== undefined && book.navSection !== null) {
    const trimmed = book.navSection.trim()
    return trimmed.length > 0 && trimmed.toLowerCase() !== "none" ? trimmed : null
  }

  if (book.seriesInfo?.name) {
    return book.seriesInfo.name
  }

  if (book.category === "comedy") {
    return "Mature Readers"
  }

  if (book.category === "adventures" || book.category === "comics") {
    return LUCA_KAI_SERIES
  }

  return null
}

function bookToNavItem(book: Book): NavItem {
  return {
    label: getBookNavLabel(book),
    href: getBookPath(book),
    description: book.shortDescription,
  }
}

export async function getBooksNav(): Promise<NavSection[]> {
  const catalogBooks = await getAllBooks()
  const sortedBooks = [...catalogBooks].sort((a, b) => a.order - b.order)

  const sectionMap = new Map<string, NavItem[]>()

  for (const book of sortedBooks) {
    const sectionTitle = resolveBookNavSection(book)
    if (!sectionTitle) continue

    const items = sectionMap.get(sectionTitle) ?? []
    items.push(bookToNavItem(book))
    sectionMap.set(sectionTitle, items)
  }

  const sections: NavSection[] = []
  for (const [title, items] of sectionMap.entries()) {
    sections.push({ title, items })
  }

  return sections
}

export async function getBookByPath(pathname: string): Promise<Book | undefined> {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  const segments = normalized.split("/").filter(Boolean)

  if (segments.length !== 2) {
    return undefined
  }

  const [segment, slug] = segments
  if (segment !== "books" && segment !== "comics") {
    return undefined
  }

  const catalogBooks = await getAllBooks()
  const book = catalogBooks.find((entry) => entry.slug === slug)
  if (!book || getBookPath(book) !== normalized) {
    return undefined
  }

  return book
}
