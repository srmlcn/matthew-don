import { AboutBio } from "@/app/components/about-bio"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { getBreadcrumbs } from "@/lib/config/navigation"
import { getPageSection } from "@/lib/data/pages"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Matthew Don - Author Bio",
  description:
    "Learn about Matthew Don, author of The Adventures of Luca and Kai series and A Celebration of the History of Celebrating History. Based in Tucson, Arizona, Matt writes adventure fantasy for all ages and humorous fiction for adults.",
  openGraph: {
    title: "About Matthew Don - Author Bio",
    description:
      "Learn about Matthew Don, author of The Adventures of Luca and Kai series. Based in Tucson, Arizona, Matt writes adventure fantasy for all ages and humorous fiction for adults.",
    images: [
      {
        url: "/matthew-don.jpg",
        alt: "Matthew Don - Author",
        width: 724,
        height: 763,
      },
    ],
  },
}

export default async function AboutPage() {
  const [breadcrumbs, bioSection] = await Promise.all([
    getBreadcrumbs("/about"),
    getPageSection("about", "bio"),
  ])

  const heading = bioSection?.content?.title ?? "About Me"

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-bold text-4xl text-center md:text-left">{heading}</h1>
      {bioSection?.isVisible !== false && (
        <AboutBio content={bioSection?.content} />
      )}
    </div>
  )
}
