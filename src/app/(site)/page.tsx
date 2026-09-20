import { Divider } from "@/components/ui/divider"
import { Hero } from "@/app/components/hero"
import { AllBooks } from "@/app/components/all-books"
import { NewsletterSignup } from "@/app/components/newsletter-signup"
import { Invitation } from "@/app/components/invitation"
import type { Metadata } from "next"
import { getBooksByStatus } from "@/lib/data/books"
import { getSiteSettings } from "@/lib/data/settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const canonicalUrl = settings.canonicalUrl || "https://matthewdon.com"
  const ogImageUrl = settings.ogImage || "/matthew-don.jpg"

  return {
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: "/",
    },
    title: `${settings.name} - Author of Adventure Fantasy & Humorous Fiction`,
    description:
      "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences. Explore adventure fantasy, comics, and more.",
    keywords: [
      settings.name,
      "author",
      "adventure fantasy",
      "children's books",
      "The Adventures of Luca and Kai",
      "The Moon Queen",
      "The Celestial Samurai",
      "young adult fiction",
      "comedy books",
      "satirical fiction",
      "A Celebration of the History of Celebrating History",
      "book series",
      "family-friendly books",
      "Tucson author",
    ],
    openGraph: {
      title: `${settings.name} - Author of Adventure Fantasy & Humorous Fiction`,
      description:
        "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences.",
      images: [
        {
          url: ogImageUrl,
          alt: `${settings.name} - Author`,
          width: 724,
          height: 763,
        },
      ],
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      site: "@MatthewDon",
      title: `${settings.name} - Author of Adventure Fantasy & Humorous Fiction`,
      description:
        "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences.",
      creator: "@MatthewDon",
      images: [
        {
          url: ogImageUrl,
          alt: `${settings.name} - Author`,
        },
      ],
    },
  }
}

export default async function Home() {
  const publishedBooks = await getBooksByStatus("published")
  const upcomingBooks = await getBooksByStatus("upcoming")

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto w-full">
      <Hero />

      <Divider />

      <AllBooks books={publishedBooks} upcomingBooks={upcomingBooks} />

      <Divider />

      <NewsletterSignup />

      <Divider />

      <Invitation />
    </div>
  )
}
