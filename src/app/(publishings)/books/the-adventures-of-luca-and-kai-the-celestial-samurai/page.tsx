import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import { celestialSamurai } from "@/lib/data/books"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${celestialSamurai.title}: ${celestialSamurai.subtitle} - Book 2 | Matthew Don`,
  description: celestialSamurai.longDescription.join(" "),
  openGraph: {
    title: `${celestialSamurai.title}: ${celestialSamurai.subtitle}`,
    description: celestialSamurai.longDescription[0],
    images: [
      {
        url: celestialSamurai.cover.src,
        alt: celestialSamurai.cover.alt,
        width: celestialSamurai.cover.width,
        height: celestialSamurai.cover.height,
      },
    ],
  },
}

export default function Page() {
  return <EnhancedBookPage book={celestialSamurai} />
}
