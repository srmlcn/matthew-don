import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import { moonQueen } from "@/lib/data/books"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${moonQueen.title}: ${moonQueen.subtitle} - Book 1 | Matthew Don`,
  description: moonQueen.longDescription.join(" "),
  openGraph: {
    title: `${moonQueen.title}: ${moonQueen.subtitle}`,
    description: moonQueen.longDescription[0],
    images: [
      {
        url: moonQueen.cover.src,
        alt: moonQueen.cover.alt,
        width: moonQueen.cover.width,
        height: moonQueen.cover.height,
      },
    ],
  },
}

export default function Page() {
  return <EnhancedBookPage book={moonQueen} />
}
