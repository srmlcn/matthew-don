import { upcomingBooks } from "@/lib/book-data"
import { Book } from "./book"

export function ComingSoon() {
  return (
    <div className="flex flex-col items-center gap-12">
      <p className="font-bold text-4xl text-center">
        Here's what is coming next!
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {upcomingBooks.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </div>
  )
}
