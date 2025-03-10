"use client"

import { LinkData } from "@/lib/link-data"
import { Button } from "@heroui/react"
import Link from "next/link"
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
          <Button
            as={Link}
            key={link.vendor}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            startContent={icons[link.vendor] ?? undefined}
            className={classes[link.vendor] ?? ""}
          >
            {link.label}
          </Button>
        )
      })}
    </AnimatedSection>
  )
}
