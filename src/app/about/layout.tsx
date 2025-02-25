import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Matthew Don",
  description:
    "Meet Matthew Don: author, former flight attendant, occasional bowler, and Tucson native. Writing started as a way to impress a girl—it didn't work, but at least he found a hobby.",
  keywords: [
    "about the author",
    "Matthew Don",
    "writer bio",
    "Tucson author",
    "The Adventures of Luca and Kai",
    "A Celebration of the History of Celebrating History",
    "fiction writer",
    "author background",
  ],
  openGraph: {
    title: "About | Matthew Don",
    description:
      "Meet Matthew Don: author, former flight attendant, occasional bowler, and Tucson native. Writing started as a way to impress a girl—it didn't work, but at least he found a hobby.",
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
    title: "About | Matthew Don",
    description:
      "Meet Matthew Don: author, former flight attendant, occasional bowler, and Tucson native. Writing started as a way to impress a girl—it didn't work, but at least he found a hobby.",
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full flex flex-col items-center">{children}</div>
}
