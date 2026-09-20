"use client"

import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"
import type { InvitationSectionContent, PageSectionContent } from "@/lib/data/pages"

interface InvitationProps {
  content?: InvitationSectionContent | PageSectionContent
}

export function Invitation({ content }: InvitationProps = {}) {
  const title = content?.title ?? "Wanna know a little about me?"
  const cta = content?.primaryCta ?? {
    label: "I dunno, maybe click this button here then.",
    href: "/about",
    variant: "ghost" as const,
  }
  const paragraphs = content?.paragraphs ?? []

  return (
    <AnimatedSection className="flex flex-col items-center gap-8">
      <h2 className="font-bold text-4xl text-center">{title}</h2>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center"
        >
          {p}
        </p>
      ))}
      {cta?.href && cta?.label && (
        <LinkButton
          href={cta.href}
          variant={
            (cta.variant as "default" | "outline" | "ghost") ?? "ghost"
          }
          className="text-xl h-full px-4 py-2 text-wrap w-48 sm:w-fit text-center"
        >
          {cta.label}
        </LinkButton>
      )}
    </AnimatedSection>
  )
}
