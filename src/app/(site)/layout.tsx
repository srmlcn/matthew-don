import { SiteNavbar } from "@/app/components/site-navbar"
import { SiteFooter } from "@/app/components/site-footer"
import { SkipToContent } from "@/components/layout/skip-to-content"
import { getBooksNav } from "@/lib/data/books"

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const booksNav = await getBooksNav()

  return (
    <>
      <SkipToContent />
      <div className="flex-1">
        <SiteNavbar booksNav={booksNav} />
        <main
          id="main-content"
          className="flex flex-col items-center flex-1"
        >
          <div className="container px-4 py-20">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
