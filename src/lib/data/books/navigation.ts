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

function isLucaKaiBook(book: Book): boolean {
  if (book.status === "upcoming") {
    return false
  }

  return (
    book.seriesInfo?.name === LUCA_KAI_SERIES ||
    book.category === "comics" ||
    (book.category === "adventures" && book.title.includes("Luca and Kai"))
  )
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
  const lucaKaiBooks = catalogBooks
    .filter(isLucaKaiBook)
    .sort((a, b) => a.order - b.order)

  const matureBooks = catalogBooks
    .filter((book) => book.category === "comedy" && book.status !== "upcoming")
    .sort((a, b) => a.order - b.order)

  const sections: NavSection[] = []

  if (lucaKaiBooks.length > 0) {
    sections.push({
      title: LUCA_KAI_SERIES,
      items: lucaKaiBooks.map(bookToNavItem),
    })
  }

  if (matureBooks.length > 0) {
    sections.push({
      title: "Mature Readers",
      items: matureBooks.map(bookToNavItem),
    })
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
