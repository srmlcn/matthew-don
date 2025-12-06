import { BookData } from "@/lib/book-data"
import Link from "next/link"
import { AnimatedSection } from "./animated-section"
import { BookCover } from "./book-cover"
import { LinkButtons } from "./link-buttons"
import { cn } from "@/lib/utils"

export function Book({
  title,
  descriptions,
  imageData,
  linkData,
  size = "sm",
}: BookData & { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: "max-h-[28rem]",
    md: "max-h-[32rem]",
    lg: "max-h-[48rem]",
  }
  const bookCover = (
    <BookCover
      imageData={imageData}
      animate={false}
      classNames={{ image: cn(sizeMap[size]) }}
    />
  )

  return (
    <AnimatedSection className="flex flex-col items-center gap-4">
      {linkData.internal ? (
        <Link href={linkData.internal.href}>{bookCover}</Link>
      ) : (
        bookCover
      )}

      <h3 className="font-bold text-xl text-center text-balance">{title}</h3>
      <div className="flex flex-col items-center gap-2">
        {descriptions.map((description, index) => (
          <p className="text-center" key={index}>
            {description}
          </p>
        ))}
      </div>
      <LinkButtons linkData={linkData} animate={false} />
    </AnimatedSection>
  )
}
