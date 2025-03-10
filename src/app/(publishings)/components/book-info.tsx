import { AnimatedSection } from "@/app/components/animated-section"
import { BookData } from "@/lib/book-data"
import DOMPurify from "isomorphic-dompurify"

export function BookInfo({ title, descriptionsExpanded }: Partial<BookData>) {
  return (
    <AnimatedSection className="flex flex-col items-center prose">
      <h1 className="text-center">{title}</h1>
      {descriptionsExpanded?.map((description, index) => (
        <p key={index}>{DOMPurify.sanitize(description)}</p>
      ))}
    </AnimatedSection>
  )
}
