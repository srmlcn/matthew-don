import { BookData } from "@/lib/book-data"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"
import { AnimatedSection } from "./animated-section"
import { BookCover } from "./book-cover"
import { LinkButtons } from "./link-buttons"

export function Book({ title, descriptions, imageData, linkData }: BookData) {
  const bookCover = (
    <BookCover imageData={imageData} className="max-h-[32rem]" />
  )

  return (
    <AnimatedSection className="flex flex-col items-center gap-4">
      {linkData.internal ? (
        <Link href={linkData.internal.href}>{bookCover}</Link>
      ) : (
        bookCover
      )}

      <h3 className="font-bold text-xl text-center">{title}</h3>
      <div className="flex flex-col items-center gap-2">
        {descriptions.map((description, index) => (
          <p className="text-center" key={index}>
            {DOMPurify.sanitize(description)}
          </p>
        ))}
      </div>
      <LinkButtons linkData={linkData} animate={false} />
    </AnimatedSection>
  )
}
