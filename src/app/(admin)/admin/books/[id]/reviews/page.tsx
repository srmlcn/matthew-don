import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAdminBook, getAdminBookReviews } from "@/lib/data/books/admin"
import { BookReviewsManager } from "../../components/book-reviews-manager"
import { LinkButton } from "@/components/ui/link-button"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Book Reviews",
}

interface ReviewsPageProps {
  params: Promise<{ id: string }>
}

export default async function BookReviewsPage({ params }: ReviewsPageProps) {
  const { id } = await params
  const book = await getAdminBook(id)

  if (!book) {
    notFound()
  }

  const reviews = await getAdminBookReviews(id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/admin/books" className="hover:underline">Books</Link>
            <span>/</span>
            <Link href={`/admin/books/${book.id}`} className="hover:underline">{book.title}</Link>
            <span>/</span>
            <span>Reviews</span>
          </div>
          <h1 className="text-2xl font-bold">Reviews: {book.title}</h1>
        </div>
        <LinkButton href={`/admin/books/${book.id}`} variant="outline">
          Back to Book
        </LinkButton>
      </div>
      <Divider />
      <BookReviewsManager bookId={book.id} initialReviews={reviews} />
    </div>
  )
}
