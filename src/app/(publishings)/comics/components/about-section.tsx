import { AnimatedSection } from "@/app/components/animated-section"
import {
  adventuresOfLucaAndKaiTheComicsAuthorImageData as authorImageData,
  adventuresOfLucaAndKaiTheComicsIllustratorImageData as illustratorImageData,
} from "@/lib/image-data"
import Image from "next/image"

export function AboutSection() {
  return (
    <AnimatedSection className="max-w-[64rem] w-full grid grid-cols-1 sm:grid-cols-2 gap-12">
      <Image
        src={authorImageData.src}
        alt={authorImageData.alt}
        width={authorImageData.width}
        height={authorImageData.height}
      />
      <Image
        src={illustratorImageData.src}
        alt={illustratorImageData.alt}
        width={illustratorImageData.width}
        height={illustratorImageData.height}
      />
    </AnimatedSection>
  )
}
