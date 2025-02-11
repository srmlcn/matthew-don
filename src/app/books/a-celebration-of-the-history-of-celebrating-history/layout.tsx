import type { Metadata } from "next"
import { celebrationOfTheHistoryOfCelebratingHistoryImageData as imageData } from "@/lib/image-data"

export const metadata: Metadata = {
  title: "A Celebration of the History of Celebrating History | Matthew Don",
  description:
    "A hilarious, irreverent take on the history behind our favorite holidays. 'A Celebration of the History of Celebrating History' blends satire, dark humor, and absurdity in a book strictly for mature readers.",
  keywords: [
    "humor book",
    "satire book",
    "adult fiction",
    "dark comedy",
    "historical satire",
    "comedy book",
    "irreverent humor",
    "parody",
    "funny books for adults",
    "The History of Celebrating History",
  ],
  openGraph: {
    title: "A Celebration of the History of Celebrating History | Matthew Don",
    description:
      "A hilarious, irreverent take on the history behind our favorite holidays. 'A Celebration of the History of Celebrating History' blends satire, dark humor, and absurdity in a book strictly for mature readers.",
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
    title: "A Celebration of the History of Celebrating History | Matthew Don",
    description:
      "A hilarious, irreverent take on the history behind our favorite holidays. 'A Celebration of the History of Celebrating History' blends satire, dark humor, and absurdity in a book strictly for mature readers.",
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
