import { AnimatedSection } from "@/app/components/animated-section"
import { LinkButton } from "@/components/ui/link-button"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { getBreadcrumbs } from "@/lib/config/navigation"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Matthew Don - Get in Touch",
  description:
    "Have questions about Matthew Don's books? Want to reach out? Connect with Matt on Instagram or TikTok to discuss The Adventures of Luca and Kai, book signings, or just to say hello!",
  openGraph: {
    title: "Contact Matthew Don",
    description:
      "Connect with author Matthew Don on Instagram or TikTok. Ask questions, share feedback, or just say hi!",
  },
}

export default function ContactPage() {
  const breadcrumbs = getBreadcrumbs("/contact")

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-bold text-4xl text-center md:text-left">
        Get in Touch
      </h1>
      <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/profile-picture.png"
            alt="Matthew Don profile illustration"
            width={482}
            height={482}
            className="w-full max-w-sm h-auto"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Have any questions you'd like to ask me? Would you like to
              complain about a spelling error you found? Just wanna say hi? Are
              you a publisher or movie producer who wants to pay me insane
              amounts of money to buy the rights to my stories? Message me on
              Instagram or TikTok!
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold mb-3">Let's connect:</p>
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
    </div>
  )
}
