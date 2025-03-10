import type { Metadata } from "next"
import { adventuresOfLucaAndKaiTheMoonQueenImageData as imageData } from "@/lib/image-data"

export const metadata: Metadata = {
  title: "The Adventures of Luca and Kai: The Moon Queen | Matthew Don",
  description:
    "Join Luca and Kai on an extraordinary adventure through portals, meeting unique friends and fearsome foes. Fast-paced action, humor, and mind-bending physics await in 'The Adventures of Luca and Kai: The Moon Queen' - a book fun for all ages!",
  keywords: [
    "adventure book",
    "fantasy book",
    "children's book",
    "young adult fiction",
    "Luca and Kai",
    "The Moon Queen",
    "fun books for kids",
    "books for all ages",
    "action books",
    "portal fantasy",
    "sibling adventure",
  ],
  openGraph: {
    title: "The Adventures of Luca and Kai: The Moon Queen | Matthew Don",
    description:
      "Join Luca and Kai on an extraordinary adventure through portals, meeting unique friends and fearsome foes. Fast-paced action, humor, and mind-bending physics await in 'The Adventures of Luca and Kai: The Moon Queen' - a book fun for all ages!",
    images: [
      {
        url: imageData.src,
        alt: imageData.alt,
        width: imageData.width,
        height: imageData.height,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MatthewDon",
    title: "The Adventures of Luca and Kai: The Moon Queen | Matthew Don",
    description:
      "Join Luca and Kai on an extraordinary adventure through portals, meeting unique friends and fearsome foes. Fast-paced action, humor, and mind-bending physics await in 'The Adventures of Luca and Kai: The Moon Queen' - a book fun for all ages!",
    creator: "@MatthewDon",
    images: [
      {
        url: imageData.src,
        alt: imageData.alt,
        width: imageData.width,
        height: imageData.height,
      },
    ],
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
