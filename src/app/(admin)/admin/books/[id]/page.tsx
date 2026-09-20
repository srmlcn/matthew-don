import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminBook } from "@/lib/data/books/admin"
import { BookForm, type BookFormValues } from "../components/book-form"

export const metadata: Metadata = {
  title: "Edit book",
}

interface EditBookPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params
  const book = await getAdminBook(id)

  if (!book) {
    notFound()
  }

  const initial: BookFormValues = {
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle ?? "",
    status: book.status,
    category: book.category,
    releaseDate: book.releaseDate ?? "",
    featured: book.featured,
    order: String(book.order),
    shortDescription: book.shortDescription,
    longDescription: book.longDescription.join("\n\n"),
    contentWarnings: book.contentWarnings?.join("\n") ?? "",
    availability: book.availability,
    isbn: book.isbn ?? "",
    pageCount: book.pageCount !== null ? String(book.pageCount) : "",
    seriesName: book.seriesName ?? "",
    seriesBook: book.seriesBook !== null ? String(book.seriesBook) : "",
    seriesTotal: book.seriesTotal !== null ? String(book.seriesTotal) : "",
    coverSrc: book.cover?.src ?? "",
    coverAlt: book.cover?.alt ?? "",
    coverWidth: book.cover ? String(book.cover.width) : "1200",
    coverHeight: book.cover ? String(book.cover.height) : "1800",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Edit book</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {book.title} · /{book.slug}
        </p>
      </div>
      <BookForm mode="edit" bookId={book.id} initial={initial} />
    </div>
  )
}
