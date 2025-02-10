import "./globals.css"
import { SiteNavbar } from "./components/site-navbar"
import { Providers } from "./providers"
import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <SiteNavbar />
          <main className="flex flex-col items-center">
            <div className="container px-4 py-20">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
