import { ImageData } from "@/lib/image-data"
import { AnimatedSection } from "./animated-section"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function BookCover({
  imageData,
  animate = true,
  classNames,
}: {
  imageData: ImageData
  animate?: boolean
  classNames?: {
    wrapper?: string
    image?: string
  }
}) {
  const wrapperClasses = cn("h-full", classNames?.wrapper)
  const imageClasses = cn("h-full", classNames?.image)

  const image = (
    <Image
      src={imageData.src}
      alt={imageData.alt}
      width={imageData.width}
      height={imageData.height}
      className={cn("h-full m-auto object-scale-down", imageClasses)}
    />
  )

  return animate ? (
    <AnimatedSection animate={animate} className={wrapperClasses}>
      {image}
    </AnimatedSection>
  ) : (
    <section className={wrapperClasses}>{image}</section>
  )
}
