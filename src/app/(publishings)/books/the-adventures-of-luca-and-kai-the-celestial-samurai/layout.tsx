import type { Metadata } from "next"
import { adventuresOfLucaAndKaiBook2of3ImageData as imageData } from "@/lib/image-data"

export const metadata: Metadata = {
  title: "The Adventures of Luca and Kai: The Celestial Samurai | Matthew Don",
  description:
    "Five years later, Luca and Kai face their greatest challenge yet when a familiar foe threatens Earth itself. Can the celebrity heroes overcome doubt and save the world from The Celestial Samurai? Fast-paced action, heroic determination, and epic battles await in this thrilling sequel!",
  keywords: [
    "adventure book",
    "fantasy book",
    "children's book",
    "young adult fiction",
    "Luca and Kai",
    "The Celestial Samurai",
    "fun books for kids",
    "books for all ages",
    "action books",
    "portal fantasy",
    "sibling adventure",
  ],
  openGraph: {
    title:
      "The Adventures of Luca and Kai: The Celestial Samurai | Matthew Don",
    description:
      "Five years later, Luca and Kai face their greatest challenge yet when a familiar foe threatens Earth itself. Can the celebrity heroes overcome doubt and save the world from The Celestial Samurai? Fast-paced action, heroic determination, and epic battles await in this thrilling sequel!",
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
    title:
      "The Adventures of Luca and Kai: The Celestial Samurai | Matthew Don",
    description:
      "Five years later, Luca and Kai face their greatest challenge yet when a familiar foe threatens Earth itself. Can the celebrity heroes overcome doubt and save the world from The Celestial Samurai? Fast-paced action, heroic determination, and epic battles await in this thrilling sequel!",
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
