/**
 * Navigation Configuration
 *
 * Centralized navigation structure for the site including breadcrumbs.
 */

import { getBookByPath, getBookNavLabel } from "@/lib/data/books"

export interface NavItem {
  label: string
  href: string
  external?: boolean
  description?: string // For better SEO and context
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string // undefined for current page
}

// Main navigation items (header)
export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

/**
 * Generate breadcrumbs for a given path
 */
export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  if (pathname === "/") return breadcrumbs

  const segments = pathname.split("/").filter(Boolean)

  // Handle books and comics via catalog lookup
  if (segments[0] === "books" || segments[0] === "comics") {
    breadcrumbs.push({
      label: segments[0] === "comics" ? "Comics" : "Books",
      href: "/#books",
    })

    if (segments[1]) {
      const book = getBookByPath(pathname)
      if (book) {
        breadcrumbs.push({ label: getBookNavLabel(book) })
      }
    }
  }
  // Handle about
  else if (segments[0] === "about") {
    breadcrumbs.push({ label: "About" })
  }
  // Handle contact
  else if (segments[0] === "contact") {
    breadcrumbs.push({ label: "Contact" })
  }

  return breadcrumbs
}

// Footer navigation
export const footerNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Books",
    href: "/#books",
  },
]

// Social links
export const socialNav: NavItem[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hiimmattdon/",
    external: true,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hiimmattdon",
    external: true,
  },
  {
    label: "Amazon",
    href: "https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO",
    external: true,
  },
  {
    label: "Goodreads",
    href: "https://www.goodreads.com/author/show/21029434.Matthew_Don",
    external: true,
  },
]
