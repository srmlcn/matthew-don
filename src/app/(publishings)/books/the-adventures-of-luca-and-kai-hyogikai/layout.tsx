import type { Metadata } from "next"
import { adventuresOfLucaAndKaiBook3of3ImageData as imageData } from "@/lib/image-data"

export const metadata: Metadata = {
  title: "The Adventures of Luca and Kai: Hyogikai | Matthew Don",
  description:
    "The epic conclusion to the Adventures of Luca and Kai trilogy is coming soon! Stay tuned for more updates.",
  keywords: [
    "adventure book",
    "fantasy book",
    "children's book",
    "young adult fiction",
    "Luca and Kai",
    "Hyogikai",
    "fun books for kids",
    "books for all ages",
    "action books",
    "portal fantasy",
    "sibling adventure",
  ],
  openGraph: {
    title: "The Adventures of Luca and Kai: Hyogikai | Matthew Don",
    description:
      "The epic conclusion to the Adventures of Luca and Kai trilogy is coming soon! Stay tuned for more updates.",
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
    title: "The Adventures of Luca and Kai: Hyogikai | Matthew Don",
    description:
      "The epic conclusion to the Adventures of Luca and Kai trilogy is coming soon! Stay tuned for more updates.",
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
