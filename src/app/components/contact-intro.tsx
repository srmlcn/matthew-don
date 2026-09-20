import Image from "next/image"
import { AnimatedSection } from "@/app/components/animated-section"
import { LinkButton } from "@/components/ui/link-button"
import type {
  ContactIntroSectionContent,
  PageSectionContent,
} from "@/lib/data/pages"

interface ContactIntroProps {
  content?: ContactIntroSectionContent | PageSectionContent
}

export function ContactIntro({ content }: ContactIntroProps = {}) {
  const image = content?.image ?? {
    src: "/profile-picture.png",
    alt: "Matthew Don profile illustration",
    width: 482,
    height: 482,
  }
  const paragraphs = content?.paragraphs ?? []
  const connectHeading = content?.connectHeading ?? "Let's connect:"

  return (
    <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
      <div className="flex justify-center md:justify-start">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 482}
          height={image.height ?? 482}
          className="w-full max-w-sm h-auto"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="prose dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div>
          <p className="text-lg font-semibold mb-3">{connectHeading}</p>
          <div className="flex flex-wrap gap-3">
            <LinkButton
              href="https://www.instagram.com/hiimmattdon/"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Matthew Don on Instagram"
            >
              Instagram
            </LinkButton>
            <LinkButton
              href="https://www.tiktok.com/@hiimmattdon"
              size="lg"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Matthew Don on TikTok"
            >
              TikTok
            </LinkButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
