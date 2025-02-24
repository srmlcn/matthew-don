import { books } from "@/lib/book-data"
import { Book } from "./book"

export function Books() {
  return (
    <div className="flex flex-col items-center gap-12">
      <p className="font-bold text-4xl text-center">{"Check out my books!"}</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </div>
  )
}
