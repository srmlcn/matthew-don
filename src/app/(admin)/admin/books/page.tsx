import type { Metadata } from "next"
import { LinkButton } from "@/components/ui/link-button"
import { Divider } from "@/components/ui/divider"
import { getAdminBooks } from "@/lib/data/books/admin"
import { BookList } from "./components/book-list"

export const metadata: Metadata = {
  title: "Books",
}

export default async function AdminBooksPage() {
  const books = await getAdminBooks()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Books</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {books.length} {books.length === 1 ? "entry" : "entries"}. Drag
            rows or use arrows to reorder.
          </p>
        </div>
        <LinkButton href="/admin/books/new">New book</LinkButton>
      </div>
      <Divider />
      <BookList books={books} />
    </div>
  )
}
