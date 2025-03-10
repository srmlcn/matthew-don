import { adventuresOfLucaAndKaiTheComicsBookData as book } from "@/lib/book-data"
import { ComicPage } from "@/app/(publishings)/comics/components/comic-page"

export default function Page() {
  return <ComicPage {...book} />
}
