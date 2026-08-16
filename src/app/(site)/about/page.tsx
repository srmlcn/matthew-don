import { AnimatedSection } from "@/app/components/animated-section"
import { LinkButton } from "@/components/ui/link-button"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { getBreadcrumbs } from "@/lib/config/navigation"
import Image from "next/image"
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

export default function AboutPage() {
  const breadcrumbs = getBreadcrumbs("/about")

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="font-bold text-4xl text-center md:text-left">About Me</h1>
      <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/matthew-don.jpg"
            alt="Matthew Don - Author photo"
            width={724}
            height={763}
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>
              That's me. Ok, the picture is over a decade old. I'm bald now. I'm
              not trying to catfish you or anything, so chill. This is an author
              bio, not a dating app. I also go by Matthew, if you'd prefer. Some
              people call me Mo or Pete (just some old nicknames, long story).
            </p>

            <p>
              My full name is Matthew Don. I was born and raised in Tucson,
              Arizona, and, outside of a few years in New Jersey and Texas, have
              lived in the Old Pueblo my entire life. In the real world, I'm
              just a working stiff who has held a wide variety of jobs,
              including a 7 year stint as a flight attendant and a 2 day stint
              at a bowling alley. I enjoy trying out different hobbies and
              spending time with my family, like my two nephews named Luca and
              Kai!
            </p>

            <p>
              Like most writers, I started writing to impress a girl. It didn't
              work, but at least I found a hobby I enjoy. My first book, A
              Celebration of the History of Celebrating History, was published
              in 2015. After a long hiatus, my brother, Chris, wanted me to work
              with him on a story for his two children. Thus, The Adventures of
              Luca and Kai was born.
            </p>

            <p>
              Anywhoooo, feel free to message me on Instagram or TikTok with any
              questions or concerns, or if you just want to say hi!
            </p>
          </div>

          <div className="pt-4">
            <p className="text-lg font-semibold mb-3">Connect with me:</p>
            <div className="flex flex-wrap gap-3">
              <LinkButton
                href="https://www.instagram.com/hiimmattdon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Matthew Don on Instagram"
              >
                Instagram
              </LinkButton>
              <LinkButton
                href="https://www.tiktok.com/@hiimmattdon"
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Matthew Don on TikTok"
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
