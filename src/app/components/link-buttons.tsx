"use client"

import { LinkData } from "@/lib/link-data"
import { LinkButton } from "@/components/ui/link-button"
import { ReactNode } from "react"
import { FaAmazon, FaGoodreadsG } from "react-icons/fa"
import { AnimatedSection } from "./animated-section"

export function LinkButtons({
  linkData,
  animate = true,
}: {
  linkData: LinkData
  animate?: boolean
}) {
  return (
    <AnimatedSection
      animate={animate}
      className="flex flex-col gap-4 items-center"
    >
      {linkData.external.map((link) => {
        const classes: Record<string, string> = {
          amazon: "bg-amazon text-black",
          goodreads: "bg-goodreads text-white",
        }

        const icons: Record<string, ReactNode> = {
          amazon: <FaAmazon className="text-lg" />,
          goodreads: <FaGoodreadsG className="text-lg" />,
        }

        return (
          <LinkButton
            key={link.vendor}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes[link.vendor] ?? ""}
          >
            {icons[link.vendor] && (
              <span className="mr-2">{icons[link.vendor]}</span>
            )}
            {link.label}
          </LinkButton>
        )
      })}
    </AnimatedSection>
  )
}
