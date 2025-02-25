import { ImageData } from "@/lib/image-data"
import { AnimatedSection } from "./animated-section"
import Image from "next/image"

export function BookCover({
  imageData,
  animate = true,
  className,
}: {
  imageData: ImageData
  animate?: boolean
  className?: string
}) {
  const image = (
    <Image
      src={imageData.src}
      alt={imageData.alt}
      width={imageData.width}
      height={imageData.height}
      className="h-full m-auto object-scale-down"
    />
  )

  return animate ? (
    <AnimatedSection animate={animate} className={className}>
      {image}
    </AnimatedSection>
  ) : (
    <section className={className}>{image}</section>
  )
}
