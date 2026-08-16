import "./globals.css"
import { Providers } from "./providers"
import { Outfit } from "next/font/google"
import type { Metadata } from "next"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Matthew Don - Author",
    template: "%s | Matthew Don",
  },
  description: "Official website of author Matthew Don",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="light transition-colors duration-1000 ease-in-out"
    >
      <body className={`${outfit.className} antialiased min-h-screen flex flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
