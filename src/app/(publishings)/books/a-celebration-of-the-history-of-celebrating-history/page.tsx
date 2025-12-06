import { EnhancedBookPage } from "@/app/components/enhanced-book-page"
import { celebrationOfHistory } from "@/lib/data/books"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `${celebrationOfHistory.title} | Matthew Don`,
  description: celebrationOfHistory.longDescription.join(" "),
  openGraph: {
    title: celebrationOfHistory.title,
    description: celebrationOfHistory.longDescription[0],
    images: [
      {
        url: celebrationOfHistory.cover.src,
        alt: celebrationOfHistory.cover.alt,
        width: celebrationOfHistory.cover.width,
        height: celebrationOfHistory.cover.height,
      },
    ],
  },
}

export default function Page() {
  return <EnhancedBookPage book={celebrationOfHistory} />
}
