import "./globals.css"
import { SiteNavbar } from "./components/site-navbar"
import { Providers } from "./providers"
import { Outfit } from "next/font/google"
import { SiteFooter } from "./components/site-footer"
import { SkipToContent } from "@/components/layout/skip-to-content"
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
      <body className={`antialiased min-h-screen flex flex-col`}>
        <SkipToContent />
        <div className="flex-1">
          <Providers>
            <SiteNavbar />
            <main
              id="main-content"
              className="flex flex-col items-center flex-1"
            >
              <div className="container px-4 py-20">{children}</div>
            </main>
          </Providers>
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
