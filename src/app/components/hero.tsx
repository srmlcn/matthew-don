/**
 * Hero Component
 *
 * Main hero section for the home page with clear positioning and CTAs.
 */

import * as React from "react"
import Image from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import { AnimatedSection } from "./animated-section"
import { siteConfig } from "@/lib/config/site"

export function Hero() {
  return (
    <AnimatedSection className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl">
        <div className="md:w-1/3">
          <Image
            src={siteConfig.images.profilePicture}
            alt={siteConfig.author.name}
            width={400}
            height={400}
            className="rounded-full shadow-lg"
            priority
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-6 text-center md:text-left">
          <div>
            <h1 className="font-bold text-5xl mb-2">
              {siteConfig.author.name}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Author of Adventure Fantasy & Humorous Fiction
            </p>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            Welcome! I write stories that spark imagination and laughter—from
            thrilling adventures perfect for young readers to satirical comedies
            for those who appreciate irreverent humor. Dive into the world of
            Luca and Kai, or explore my other quirky tales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <LinkButton href="#books" size="lg">
              View My Books
            </LinkButton>
            <LinkButton href="/about" size="lg" variant="outline">
              About Me
            </LinkButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
