import type { Metadata } from "next"
import { BookForm } from "../components/book-form"

export const metadata: Metadata = {
  title: "New book",
}

export default function NewBookPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">New book</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Creates a catalog entry and revalidates the site.
        </p>
      </div>
      <BookForm mode="create" />
    </div>
  )
}
