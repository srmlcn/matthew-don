import { ContactIntro } from "@/app/components/contact-intro"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { getBreadcrumbs } from "@/lib/config/navigation"
import { getPageSection } from "@/lib/data/pages"
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

export default async function ContactPage() {
  const [breadcrumbs, introSection] = await Promise.all([
    getBreadcrumbs("/contact"),
    getPageSection("contact", "intro"),
  ])

  const heading = introSection?.content?.title ?? "Get in Touch"

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-bold text-4xl text-center md:text-left">{heading}</h1>
      {introSection?.isVisible !== false && (
        <ContactIntro content={introSection?.content} />
      )}
    </div>
  )
}
