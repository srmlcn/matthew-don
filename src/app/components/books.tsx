import {
  adventuresOfLucaAndKaiTheMoonQueenLinkData,
  celebrationOfTheHistoryOfCelebratingHistoryLinkData,
} from "@/lib/link-data"
import { Book, BookProps } from "./book"
import {
  adventuresOfLucaAndKaiTheMoonQueenImageData,
  celebrationOfTheHistoryOfCelebratingHistoryImageData,
} from "@/lib/image-data"

export function Books() {
  const books: BookProps[] = [
    {
      title: "The Adventures of Luca and Kai: The Moon Queen (Book 1 of 3)",
      descriptions: [
        "Fun for all ages!",
        "Available in paperback, Ebook, and FREE through Kindle Unlimited",
      ],
      imageData: adventuresOfLucaAndKaiTheMoonQueenImageData,
      linkData: adventuresOfLucaAndKaiTheMoonQueenLinkData,
    },
    {
      title: "A Celebration of the History of Celebrating History",
      descriptions: [
        "Intended for mature audiences!",
        "Available in paperback, Ebook, and FREE through Kindle Unlimited",
      ],
      imageData: celebrationOfTheHistoryOfCelebratingHistoryImageData,
      linkData: celebrationOfTheHistoryOfCelebratingHistoryLinkData,
    },
  ]

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
