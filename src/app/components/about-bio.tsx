import Image from "next/image"
import { AnimatedSection } from "@/app/components/animated-section"
import { LinkButton } from "@/components/ui/link-button"
import type {
  AboutBioSectionContent,
  PageSectionContent,
} from "@/lib/data/pages"

interface AboutBioProps {
  content?: AboutBioSectionContent | PageSectionContent
}

export function AboutBio({ content }: AboutBioProps = {}) {
  const image = content?.image ?? {
    src: "/matthew-don.jpg",
    alt: "Matthew Don - Author photo",
    width: 724,
    height: 763,
  }
  const paragraphs = content?.paragraphs ?? []
  const connectHeading = content?.connectHeading ?? "Connect with me:"

  return (
    <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
      <div className="flex justify-center md:justify-start">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 724}
          height={image.height ?? 763}
          className="w-full max-w-md h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="prose dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-4">
          <p className="text-lg font-semibold mb-3">{connectHeading}</p>
          <div className="flex flex-wrap gap-3">
            <LinkButton
              href="https://www.instagram.com/hiimmattdon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Matthew Don on Instagram"
            >
              Instagram
            </LinkButton>
            <LinkButton
              href="https://www.tiktok.com/@hiimmattdon"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Matthew Don on TikTok"
            >
              TikTok
            </LinkButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
