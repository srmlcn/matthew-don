"use client"

import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"

export function Invitation() {
  return (
    <AnimatedSection className="flex flex-col items-center gap-8">
      <h2 className="font-bold text-4xl text-center">
        Wanna know a little about me?
      </h2>
      <LinkButton
        href="/about"
        variant="ghost"
        className="text-xl h-full px-4 py-2 text-wrap w-48 sm:w-fit text-center"
      >
        I dunno, maybe click this button here then.
      </LinkButton>
    </AnimatedSection>
  )
}
