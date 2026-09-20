import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import {
  getAllBooks,
  generateBookMetadata,
  getBookBySlug,
} from "@/lib/data/books"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const allBooks = await getAllBooks()
  return allBooks
    .filter((book) => book.category !== "comics")
    .map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book || book.category === "comics") {
    return {}
  }

  return await generateBookMetadata(book)
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book || book.category === "comics") {
    notFound()
  }

  return <EnhancedBookPage book={book} />
}
