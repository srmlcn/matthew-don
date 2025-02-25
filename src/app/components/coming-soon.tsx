import { upcomingBooks } from "@/lib/book-data"
import { Book } from "./book"

export function ComingSoon() {
  return (
    <section className="flex flex-col items-center gap-12">
      <h2 className="font-bold text-4xl text-center">
        Here's what is coming next!
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {upcomingBooks.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </section>
  )
}
