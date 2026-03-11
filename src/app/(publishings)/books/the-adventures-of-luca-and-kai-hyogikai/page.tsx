import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import { book3 } from "@/lib/data/books"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${book3.title}: ${book3.subtitle} - Book 3 | Matthew Don`,
  description: book3.longDescription.join(" "),
  openGraph: {
    title: `${book3.title}: ${book3.subtitle}`,
    description: book3.longDescription[0],
    images: [
      {
        url: book3.cover.src,
        alt: book3.cover.alt,
        width: book3.cover.width,
        height: book3.cover.height,
      },
    ],
  },
}

export default function Page() {
  return <EnhancedBookPage book={book3} />
}
