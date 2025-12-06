import { AnimatedSection } from "@/app/components/animated-section"
import { BookData } from "@/lib/book-data"

export function BookInfo({ title, descriptionsExpanded }: Partial<BookData>) {
  return (
    <AnimatedSection className="flex flex-col items-center prose dark:prose-invert">
      <h1 className="text-center">{title}</h1>
      {descriptionsExpanded?.map((description, index) => (
        <p key={index}>{description}</p>
      ))}
    </AnimatedSection>
  )
}
