/**
 * Navigation Configuration
 *
 * Centralized navigation structure for the site including breadcrumbs.
 */

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

// Books dropdown navigation with improved descriptions
export const booksNav: NavSection[] = [
  {
    title: "The Adventures of Luca and Kai",
    items: [
      {
        label: "The Moon Queen (Book 1)",
        href: "/books/the-adventures-of-luca-and-kai-the-moon-queen",
        description:
          "Where the adventure begins! Perfect for readers of all ages.",
      },
      {
        label: "The Celestial Samurai (Book 2)",
        href: "/books/the-adventures-of-luca-and-kai-the-celestial-samurai",
        description: "The thrilling continuation of Luca and Kai's journey.",
      },
      {
        label: "The Comics",
        href: "/comics/the-adventures-of-luca-and-kai-the-comics",
        description: "Visual adventures with Luca and Kai in comic form.",
      },
    ],
  },
  {
    title: "Mature Readers",
    items: [
      {
        label: "A Celebration of the History of Celebrating History",
        href: "/books/a-celebration-of-the-history-of-celebrating-history",
        description: "Satirical comedy for adult audiences.",
      },
    ],
  },
]

/**
 * Generate breadcrumbs for a given path
 */
export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  if (pathname === "/") return breadcrumbs

  const segments = pathname.split("/").filter(Boolean)

  // Handle books
  if (segments[0] === "books") {
    breadcrumbs.push({ label: "Books", href: "/#books" })
    if (segments[1]) {
      // Find the book name from booksNav
      const bookItem = booksNav
        .flatMap((section) => section.items)
        .find((item) => item.href === pathname)
      if (bookItem) {
        breadcrumbs.push({ label: bookItem.label })
      }
    }
  }
  // Handle comics
  else if (segments[0] === "comics") {
    breadcrumbs.push({ label: "Comics", href: "/#books" })
    if (segments[1]) {
      const comicItem = booksNav
        .flatMap((section) => section.items)
        .find((item) => item.href === pathname)
      if (comicItem) {
        breadcrumbs.push({ label: comicItem.label })
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
