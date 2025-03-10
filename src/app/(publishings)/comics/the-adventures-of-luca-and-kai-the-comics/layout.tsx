import type { Metadata } from "next"
import { adventuresOfLucaAndKaiTheComicsImageData as imageData } from "@/lib/image-data"

export const metadata: Metadata = {
  title: "The Adventures of Luca and Kai: The Comics | Matthew Don",
  description:
    "Dive into the vibrant, illustrated world of 'The Adventures of Luca and Kai: The Comics.' Experience dynamic visuals, epic adventures, and engaging storytelling in this graphic novel format—perfect for comic book enthusiasts and fans of action-packed tales.",
  keywords: [
    "comic book",
    "graphic novel",
    "illustrated adventure",
    "Luca and Kai comics",
    "adventure comics",
    "fantasy comics",
    "action comics",
    "comic series",
    "Matthew Don",
  ],
  openGraph: {
    title: "The Adventures of Luca and Kai: The Comics | Matthew Don",
    description:
      "Dive into the vibrant, illustrated world of 'The Adventures of Luca and Kai: The Comics.' Experience dynamic visuals, epic adventures, and engaging storytelling in this graphic novel format.",
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
    title: "The Adventures of Luca and Kai: The Comics | Matthew Don",
    description:
      "Dive into the vibrant, illustrated world of 'The Adventures of Luca and Kai: The Comics.' Experience dynamic visuals and epic adventures in this must-read graphic novel.",
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
