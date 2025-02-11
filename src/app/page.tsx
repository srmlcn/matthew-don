import { Divider } from "@heroui/react"
import { Book, BookProps } from "./components/book"
import { Invitation } from "./components/invitation"
import {
  adventuresOfLucaAndKaiBook2of3ImageData,
  adventuresOfLucaAndKaiBook3of3ImageData,
  adventuresOfLucaAndKaiTheMoonQueenImageData,
  celebrationOfTheHistoryOfCelebratingHistoryImageData,
} from "@/lib/image-data"
import {
  adventuresOfLucaAndKaiBook2of3LinkData,
  adventuresOfLucaAndKaiBook3of3LinkData,
  adventuresOfLucaAndKaiTheMoonQueenLinkData,
  celebrationOfTheHistoryOfCelebratingHistoryLinkData,
} from "@/lib/link-data"
import type { Metadata } from "next"

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
    <div className={`flex flex-col items-center py-20 gap-20`}>
      <Welcome />

      <Divider orientation="horizontal" />

      <Books />

      <Divider orientation="horizontal" />

      <ComingSoon />

      <Divider orientation="horizontal" />

      <Invitation />
    </div>
  )
}

function Welcome() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-bold text-4xl">{"Hi!"}</p>
      <p className="text-4xl">{"I'm Matt, and I like to write things."}</p>
    </div>
  )
}

function Books() {
  const books: BookProps[] = [
    {
      title: "The Adventures of Luca and Kai: The Moon Queen (Book 1 of 3)",
      descriptions: [
        "Fun for all ages!",
        "Available in paperback, Ebook, and FREE through Kindle Unlimited",
      ],
      image: adventuresOfLucaAndKaiTheMoonQueenImageData,
      link: adventuresOfLucaAndKaiTheMoonQueenLinkData,
    },
    {
      title: "A Celebration of the History of Celebrating History",
      descriptions: [
        "Intended for mature audiences!",
        "Available in paperback, Ebook, and FREE through Kindle Unlimited",
      ],
      image: celebrationOfTheHistoryOfCelebratingHistoryImageData,
      link: celebrationOfTheHistoryOfCelebratingHistoryLinkData,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-4xl text-center">{"Check out my books!"}</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 py-12">
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </div>
  )
}

function ComingSoon() {
  const books: BookProps[] = [
    {
      title: "The Adventures of Luca and Kai (Book 2 of 3)",
      descriptions: ["Coming Soon..."],
      image: adventuresOfLucaAndKaiBook2of3ImageData,
      link: adventuresOfLucaAndKaiBook2of3LinkData,
    },
    {
      title: "The Adventures of Luca and Kai (Book 3 of 3)",
      descriptions: ["Coming Not Quite As Soon..."],
      image: adventuresOfLucaAndKaiBook3of3ImageData,
      link: adventuresOfLucaAndKaiBook3of3LinkData,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-4xl text-center">
        {"Here's what is coming next!"}
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 py-12">
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </div>
    </div>
  )
}
