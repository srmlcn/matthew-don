import { Divider } from "@heroui/react"
import { Invitation } from "./components/invitation"
import type { Metadata } from "next"
import { Welcome } from "./components/welcome"
import { Books } from "./components/books"
import { ComingSoon } from "./components/coming-soon"
import { NewRelease } from "./components/new-release"
import { adventuresOfLucaAndKaiTheComicsBookData as bookData } from "@/lib/book-data"

export const metadata: Metadata = {
  title: "Home | Matthew Don",
  description:
    "Discover the works of Matthew Don, including the thrilling adventure 'The Adventures of Luca and Kai: The Moon Queen' and the satirical comedy 'A Celebration of the History of Celebrating History.' Explore stories that range from fun-filled journeys for all ages to irreverent humor for mature readers.",
  keywords: [
    "fiction books",
    "adventure books",
    "humor books",
    "The Adventures of Luca and Kai",
    "The Moon Queen",
    "A Celebration of the History of Celebrating History",
    "author",
    "new books",
    "book series",
    "upcoming books",
  ],
  openGraph: {
    title: "Home | Matthew Don",
    description:
      "Discover the works of Matthew Don, including the thrilling adventure 'The Adventures of Luca and Kai: The Moon Queen' and the satirical comedy 'A Celebration of the History of Celebrating History.' Explore stories that range from fun-filled journeys for all ages to irreverent humor for mature readers.",
    images: [
      {
        url: "/matthew-don.jpg",
        alt: "Matthew Don",
        width: 724,
        height: 763,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MatthewDon",
    title: "Home | Matthew Don",
    description:
      "Discover the works of Matthew Don, including the thrilling adventure 'The Adventures of Luca and Kai: The Moon Queen' and the satirical comedy 'A Celebration of the History of Celebrating History.' Explore stories that range from fun-filled journeys for all ages to irreverent humor for mature readers.",
    creator: "@MatthewDon",
    images: [
      {
        url: "/matthew-don.jpg",
        alt: "Matthew Don",
        width: 724,
        height: 763,
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex flex-col items-center py-20 gap-20">
      <Welcome />

      <Divider orientation="horizontal" />

      <NewRelease bookData={bookData} />

      <Divider orientation="horizontal" />

      <Books />

      <Divider orientation="horizontal" />

      <ComingSoon />

      <Divider orientation="horizontal" />

      <Invitation />
    </div>
  )
}
