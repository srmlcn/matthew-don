import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Matthew Don",
  description:
    "Want to send fan mail, ask about books, or challenge the author to a duel of wits? (Spoiler: You'll probably win.) Get in touch with Matthew Don here!",
  keywords: [
    "contact author",
    "message author",
    "book inquiries",
    "fan mail",
    "writing questions",
    "author email",
    "talk to a writer",
    "reach out",
    "book signing",
    "connect with an author",
  ],
  openGraph: {
    title: "Contact | Matthew Don",
    description:
      "Want to send fan mail, ask about books, or challenge the author to a duel of wits? (Spoiler: You'll probably win.) Get in touch with Matthew Don here!",
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
    title: "Contact | Matthew Don",
    description:
      "Want to send fan mail, ask about books, or challenge the author to a duel of wits? (Spoiler: You'll probably win.) Get in touch with Matthew Don here!",
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
