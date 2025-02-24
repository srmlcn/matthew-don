import { adventuresOfLucaAndKaiBook1of3BookData as book } from "@/lib/book-data"
import { BookPage } from "../components/book-page"

export default function Page() {
  return <BookPage {...book} />
}
