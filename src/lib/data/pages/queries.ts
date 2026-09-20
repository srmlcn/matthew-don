/**
 * Cached page and page sections queries backed by Neon + Drizzle.
 */

import { unstable_cache } from "next/cache"
import { and, asc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { pageSections, pages } from "@/lib/db/schema"
import type {
  PageRecord,
  PageSectionContent,
  PageSectionRecord,
} from "./types"

export const PAGES_CACHE_TAG = "pages"
export const PAGE_SECTIONS_CACHE_TAG = "page-sections"

export const DEFAULT_PAGES: PageRecord[] = [
  {
    id: "home",
    title: "Home",
    slug: "/",
    description: "Author of Adventure Fantasy & Humorous Fiction",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "about",
    title: "About",
    slug: "/about",
    description: "About Matthew Don - Author Bio",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "contact",
    title: "Contact",
    slug: "/contact",
    description: "Contact Matthew Don - Get in Touch",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
]

export const DEFAULT_PAGE_SECTIONS: Record<string, PageSectionRecord[]> = {
  home: [
    {
      id: 1,
      page: "home",
      sectionKey: "hero",
      content: {
        title: "Matthew Don",
        subtitle: "Author of Adventure Fantasy & Humorous Fiction",
        paragraphs: [
          "Welcome! I write stories that spark imagination and laughter—from thrilling adventures perfect for young readers to satirical comedies for those who appreciate irreverent humor. Dive into the world of Luca and Kai, or explore my other quirky tales.",
        ],
        primaryCta: {
          label: "View My Books",
          href: "#books",
        },
        secondaryCta: {
          label: "About Me",
          href: "/about",
          variant: "outline",
        },
        image: {
          src: "/profile-picture.png",
          alt: "Matthew Don",
          width: 400,
          height: 400,
        },
      },
      sortOrder: 0,
      isVisible: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
    {
      id: 2,
      page: "home",
      sectionKey: "newsletter",
      content: {
        title: "Stay in the Loop!",
        subtitle:
          "Get notified about new releases, special offers, and behind-the-scenes updates.",
        paragraphs: [],
        primaryCta: {
          label: "Subscribe",
          href: "#",
        },
        placeholder: "your.email@example.com",
        footnote: "We respect your privacy. Unsubscribe at any time.",
        successMessage:
          "Thanks for subscribing! Check your email to confirm.",
      },
      sortOrder: 1,
      isVisible: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
    {
      id: 3,
      page: "home",
      sectionKey: "invitation",
      content: {
        title: "Wanna know a little about me?",
        paragraphs: [],
        primaryCta: {
          label: "I dunno, maybe click this button here then.",
          href: "/about",
          variant: "ghost",
        },
      },
      sortOrder: 2,
      isVisible: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
  ],
  about: [
    {
      id: 4,
      page: "about",
      sectionKey: "bio",
      content: {
        title: "About Me",
        paragraphs: [
          "That's me. Ok, the picture is over a decade old. I'm bald now. I'm not trying to catfish you or anything, so chill. This is an author bio, not a dating app. I also go by Matthew, if you'd prefer. Some people call me Mo or Pete (just some old nicknames, long story).",
          "My full name is Matthew Don. I was born and raised in Tucson, Arizona, and, outside of a few years in New Jersey and Texas, have lived in the Old Pueblo my entire life. In the real world, I'm just a working stiff who has held a wide variety of jobs, including a 7 year stint as a flight attendant and a 2 day stint at a bowling alley. I enjoy trying out different hobbies and spending time with my family, like my two nephews named Luca and Kai!",
          "Like most writers, I started writing to impress a girl. It didn't work, but at least I found a hobby I enjoy. My first book, A Celebration of the History of Celebrating History, was published in 2015. After a long hiatus, my brother, Chris, wanted me to work with him on a story for his two children. Thus, The Adventures of Luca and Kai was born.",
          "Anywhoooo, feel free to message me on Instagram or TikTok with any questions or concerns, or if you just want to say hi!",
        ],
        connectHeading: "Connect with me:",
        image: {
          src: "/matthew-don.jpg",
          alt: "Matthew Don - Author photo",
          width: 724,
          height: 763,
        },
      },
      sortOrder: 0,
      isVisible: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
  ],
  contact: [
    {
      id: 5,
      page: "contact",
      sectionKey: "intro",
      content: {
        title: "Get in Touch",
        paragraphs: [
          "Have any questions you'd like to ask me? Would you like to complain about a spelling error you found? Just wanna say hi? Are you a publisher or movie producer who wants to pay me insane amounts of money to buy the rights to my stories? Message me on Instagram or TikTok!",
        ],
        connectHeading: "Let's connect:",
        image: {
          src: "/profile-picture.png",
          alt: "Matthew Don profile illustration",
          width: 482,
          height: 482,
        },
      },
      sortOrder: 0,
      isVisible: true,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
    },
  ],
}

function safeCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  options: { tags: string[] },
): T {
  const cached = unstable_cache(fn, keyParts, options)
  return (async (...args: any[]) => {
    try {
      return await cached(...args)
    } catch {
      return await fn(...args)
    }
  }) as T
}

async function fetchPagesFromDb(): Promise<PageRecord[]> {
  try {
    const rows = await db.query.pages.findMany({
      orderBy: [asc(pages.title)],
    })
    if (!rows || rows.length === 0) {
      return DEFAULT_PAGES
    }
    return rows as PageRecord[]
  } catch {
    return DEFAULT_PAGES
  }
}

async function fetchPageSectionsFromDb(pageId: string): Promise<PageSectionRecord[]> {
  try {
    const rows = await db.query.pageSections.findMany({
      where: eq(pageSections.page, pageId),
      orderBy: [asc(pageSections.sortOrder)],
    })
    if (!rows || rows.length === 0) {
      return DEFAULT_PAGE_SECTIONS[pageId] ?? []
    }
    return rows as PageSectionRecord[]
  } catch {
    return DEFAULT_PAGE_SECTIONS[pageId] ?? []
  }
}

const getCachedPages = safeCache(
  fetchPagesFromDb,
  ["pages-list-record"],
  { tags: [PAGES_CACHE_TAG] },
)

const getCachedPageSections = safeCache(
  fetchPageSectionsFromDb,
  ["page-sections-list-record"],
  { tags: [PAGE_SECTIONS_CACHE_TAG] },
)

export async function getPages(): Promise<PageRecord[]> {
  return getCachedPages()
}

export async function getPage(id: string): Promise<PageRecord | null> {
  const allPages = await getPages()
  return allPages.find((p) => p.id === id) ?? null
}

export async function getPageSections(
  pageId: string,
  options?: { includeHidden?: boolean },
): Promise<PageSectionRecord[]> {
  const sections = await getCachedPageSections(pageId)
  if (options?.includeHidden) {
    return sections
  }
  return sections.filter((s) => s.isVisible)
}

export async function getPageSection<T = PageSectionContent>(
  pageId: string,
  sectionKey: string,
  options?: { includeHidden?: boolean },
): Promise<PageSectionRecord<T> | null> {
  const sections = await getPageSections(pageId, options)
  const found = sections.find((s) => s.sectionKey === sectionKey)
  if (!found) {
    // If database returned sections for the page, but not this key, check defaults
    const fallback = DEFAULT_PAGE_SECTIONS[pageId]?.find(
      (s) => s.sectionKey === sectionKey,
    )
    if (fallback && (options?.includeHidden || fallback.isVisible)) {
      return fallback as unknown as PageSectionRecord<T>
    }
    return null
  }
  return found as unknown as PageSectionRecord<T>
}

export async function getPageSectionMap(
  pageId: string,
  options?: { includeHidden?: boolean },
): Promise<Record<string, PageSectionRecord>> {
  const sections = await getPageSections(pageId, options)
  const map: Record<string, PageSectionRecord> = {}
  for (const s of sections) {
    map[s.sectionKey] = s
  }
  return map
}

export async function getAllDbPages(): Promise<PageRecord[]> {
  try {
    const rows = await db.query.pages.findMany({
      orderBy: [asc(pages.title)],
    })
    if (!rows || rows.length === 0) {
      return DEFAULT_PAGES
    }
    return rows as PageRecord[]
  } catch {
    return DEFAULT_PAGES
  }
}

export async function getAllDbPageSections(
  pageId?: string,
): Promise<PageSectionRecord[]> {
  try {
    const rows = await db.query.pageSections.findMany({
      where: pageId ? eq(pageSections.page, pageId) : undefined,
      orderBy: [asc(pageSections.page), asc(pageSections.sortOrder)],
    })
    if (!rows || rows.length === 0) {
      if (pageId) {
        return DEFAULT_PAGE_SECTIONS[pageId] ?? []
      }
      return Object.values(DEFAULT_PAGE_SECTIONS).flat()
    }
    return rows as PageSectionRecord[]
  } catch {
    if (pageId) {
      return DEFAULT_PAGE_SECTIONS[pageId] ?? []
    }
    return Object.values(DEFAULT_PAGE_SECTIONS).flat()
  }
}
