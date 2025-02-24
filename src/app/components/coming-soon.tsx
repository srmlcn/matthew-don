import type { BookData } from "@/lib/book-data"
import {
  adventuresOfLucaAndKaiBook2of3ImageData,
  adventuresOfLucaAndKaiBook3of3ImageData,
} from "@/lib/image-data"
import {
  adventuresOfLucaAndKaiBook2of3LinkData,
  adventuresOfLucaAndKaiBook3of3LinkData,
} from "@/lib/link-data"
import { Book } from "./book"

export function ComingSoon() {
  const books: BookData[] = [
    {
      title: "The Adventures of Luca and Kai (Book 2 of 3)",
      descriptions: ["Coming Soon..."],
      imageData: adventuresOfLucaAndKaiBook2of3ImageData,
      linkData: adventuresOfLucaAndKaiBook2of3LinkData,
    },
    {
      title: "The Adventures of Luca and Kai (Book 3 of 3)",
      descriptions: ["Coming Not Quite As Soon..."],
      imageData: adventuresOfLucaAndKaiBook3of3ImageData,
      linkData: adventuresOfLucaAndKaiBook3of3LinkData,
    },
  ]

  return (
    <div className="flex flex-col items-center gap-12">
      <p className="font-bold text-4xl text-center">
        {"Here's what is coming next!"}
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </div>
  )
}
