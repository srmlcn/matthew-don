/**
 * Hero Component
 *
 * Main hero section for the home page with clear positioning and CTAs.
 * Renders structured section data from CMS.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"
import { siteConfig } from "@/lib/config/site"
import type { HeroSectionContent, PageSectionContent } from "@/lib/data/pages"

const DEFAULT_PARAGRAPH =
  "Welcome! I write stories that spark imagination and laughter—from thrilling adventures perfect for young readers to satirical comedies for those who appreciate irreverent humor. Dive into the world of Luca and Kai, or explore my other quirky tales."

interface HeroProps {
  content?: HeroSectionContent | PageSectionContent
}

export function Hero({ content }: HeroProps = {}) {
  const title = content?.title || siteConfig.author.name
  const subtitle =
    content?.subtitle || "Author of Adventure Fantasy & Humorous Fiction"
  const paragraphs =
    content?.paragraphs && content.paragraphs.length > 0
      ? content.paragraphs
      : [DEFAULT_PARAGRAPH]
  const imageSrc =
    content?.image?.src || siteConfig.images.profilePicture
  const imageAlt = content?.image?.alt || title

  const primaryCta = content?.primaryCta ?? {
    label: "View My Books",
    href: "#books",
  }

  const secondaryCta = content?.secondaryCta ?? {
    label: "About Me",
    href: "/about",
    variant: "outline" as const,
  }

  return (
    <AnimatedSection className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl">
        <div className="md:w-1/3">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={content?.image?.width || 400}
            height={content?.image?.height || 400}
            className="rounded-full shadow-lg"
            priority
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-6 text-center md:text-left">
          <div>
            <h1 className="font-bold text-5xl mb-2">{title}</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl"
            >
              {paragraph}
            </p>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {primaryCta.label && primaryCta.href && (
              <LinkButton
                href={primaryCta.href}
                size="lg"
                variant={
                  (primaryCta.variant as
                    | "default"
                    | "outline"
                    | "ghost") ?? "default"
                }
              >
                {primaryCta.label}
              </LinkButton>
            )}
            {secondaryCta.label && secondaryCta.href && (
              <LinkButton
                href={secondaryCta.href}
                size="lg"
                variant={
                  (secondaryCta.variant as
                    | "default"
                    | "outline"
                    | "ghost") ?? "outline"
                }
              >
                {secondaryCta.label}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
