import { adventuresOfLucaAndKaiBook1of3BookData as book } from "@/lib/book-data"
import { BookPage } from "@/app/(publishings)/books/components/book-page"

export default function Page() {
  return <BookPage {...book} />
}
