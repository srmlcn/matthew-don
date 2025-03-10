"use client"

import { Button } from "@heroui/react"
import Link from "next/link"
import { AnimatedSection } from "./animated-section"

export function Invitation() {
  return (
    <AnimatedSection className="flex flex-col items-center gap-8">
      <h2 className="font-bold text-4xl text-center">
        Wanna know a little about me?
      </h2>
      <Button
        as={Link}
        href="/about"
        color="secondary"
        className="text-xl h-full px-4 py-2 text-wrap w-48 sm:w-fit text-center"
      >
        I dunno, maybe click this button here then.
      </Button>
    </AnimatedSection>
  )
}
