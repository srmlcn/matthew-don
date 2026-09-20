import type { Metadata } from "next"
import Link from "next/link"
import { getAdminBooks } from "@/lib/data/books/admin"
import { LinkButton } from "@/components/ui/link-button"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Book Reviews",
}

export default async function AdminReviewsDashboardPage() {
  const books = await getAdminBooks()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews Moderation</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage reader testimonials, reorder entries, and toggle visibility per book.
        </p>
      </div>
      <Divider />
      <div className="grid gap-4 sm:grid-cols-2">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <div>
              <h2 className="font-semibold">{book.title}</h2>
              {book.subtitle && (
                <p className="text-xs text-gray-500">{book.subtitle}</p>
              )}
              <span className="text-xs text-gray-400">/{book.slug}</span>
            </div>
            <LinkButton href={`/admin/books/${book.id}/reviews`} size="sm">
              Manage Reviews →
            </LinkButton>
          </div>
        ))}
      </div>
    </div>
  )
}
