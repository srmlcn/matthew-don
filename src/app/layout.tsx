import "./globals.css"
import { Providers } from "./providers"
import { Outfit } from "next/font/google"
import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/data/settings"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const canonicalUrl = settings.canonicalUrl || "https://matthewdon.com"

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: `${settings.name} - Author`,
      template: `%s | ${settings.name}`,
    },
    description: settings.tagline || "Official website of author Matthew Don",
  }
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
