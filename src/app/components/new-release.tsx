import { AnimatedSection } from "@/app/components/animated-section"
import { Book } from "./book"
import type { BookData } from "@/lib/book-data"

export function NewRelease({ bookData }: { bookData: BookData }) {
  return (
    <AnimatedSection className="flex flex-col items-center gap-12">
      <h2 className="font-bold text-4xl text-center">My latest release!</h2>
      <Book size="lg" {...bookData} />
    </AnimatedSection>
  )
}
