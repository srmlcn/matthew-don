import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import {
  allBooks,
  generateBookMetadata,
  getBookBySlug,
} from "@/lib/data/books"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allBooks
    .filter((book) => book.category === "comics")
    .map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book || book.category !== "comics") {
    return {}
  }

  return generateBookMetadata(book)
}

export default async function ComicPage({ params }: PageProps) {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book || book.category !== "comics") {
    notFound()
  }

  return <EnhancedBookPage book={book} />
}
