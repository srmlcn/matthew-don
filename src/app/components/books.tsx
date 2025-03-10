import { books } from "@/lib/book-data"
import { Book } from "./book"
import { AnimatedSection } from "./animated-section"

export function Books() {
  return (
    <AnimatedSection className="flex flex-col items-center gap-12">
      <h2 className="font-bold text-4xl text-center">
        Check out all of my books!
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {books
          .filter((book) => book.releaseDate !== undefined)
          .sort((a, b) => a.releaseDate!.getTime() - b.releaseDate!.getTime())
          .reverse()
          .map((book) => (
            <Book key={book.title} {...book} />
          ))}
      </div>
    </AnimatedSection>
  )
}
