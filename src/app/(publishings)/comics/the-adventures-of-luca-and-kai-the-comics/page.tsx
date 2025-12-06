import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import { lucaAndKaiComics } from "@/lib/data/books"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${lucaAndKaiComics.title}: ${lucaAndKaiComics.subtitle} | Matthew Don`,
  description: lucaAndKaiComics.longDescription.join(" "),
  openGraph: {
    title: `${lucaAndKaiComics.title}: ${lucaAndKaiComics.subtitle}`,
    description: lucaAndKaiComics.longDescription[0],
    images: [
      {
        url: lucaAndKaiComics.cover.src,
        alt: lucaAndKaiComics.cover.alt,
        width: lucaAndKaiComics.cover.width,
        height: lucaAndKaiComics.cover.height,
      },
    ],
  },
}

export default function Page() {
  return <EnhancedBookPage book={lucaAndKaiComics} />
}
