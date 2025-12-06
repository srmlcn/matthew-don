import { Divider } from "@/components/ui/divider"
import { Hero } from "./components/hero"
import { AllBooks } from "./components/all-books"
import { NewsletterSignup } from "./components/newsletter-signup"
import { Invitation } from "./components/invitation"
import type { Metadata } from "next"
import { publishedBooks, upcomingBooks } from "@/lib/data/books"

export const metadata: Metadata = {
  title: "Matthew Don - Author of Adventure Fantasy & Humorous Fiction",
  description:
    "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences. Explore adventure fantasy, comics, and more.",
  keywords: [
    "Matthew Don",
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
    title: "Matthew Don - Author of Adventure Fantasy & Humorous Fiction",
    description:
      "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences.",
    images: [
      {
        url: "/matthew-don.jpg",
        alt: "Matthew Don - Author",
        width: 724,
        height: 763,
      },
    ],
    type: "website",
    url: "https://matthewdon.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MatthewDon",
    title: "Matthew Don - Author of Adventure Fantasy & Humorous Fiction",
    description:
      "Discover the imaginative worlds of Matthew Don. From the thrilling 'Adventures of Luca and Kai' series perfect for young readers, to satirical comedy for mature audiences.",
    creator: "@MatthewDon",
    images: [
      {
        url: "/matthew-don.jpg",
        alt: "Matthew Don - Author",
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto w-full">
      {/* Hero Section */}
      <Hero />

      <Divider />

      {/* All Books in a Unified Display */}
      <AllBooks books={publishedBooks} upcomingBooks={upcomingBooks} />

      <Divider />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Divider />

      {/* Contact Invitation */}
      <Invitation />
    </div>
  )
}
