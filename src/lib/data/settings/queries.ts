/**
 * Cached site settings and navigation queries backed by Neon + Drizzle.
 */

import { unstable_cache } from "next/cache"
import { and, asc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { navItems, siteSettings } from "@/lib/db/schema"
import type { NavItem } from "@/lib/config/navigation"
import type { DbNavItem, SiteSettings } from "./types"

export const SITE_SETTINGS_CACHE_TAG = "site-settings"

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "default",
  name: "Matthew Don",
  tagline: "Author of Adventure Fantasy & Humorous Fiction",
  canonicalUrl: "https://matthewdon.com",
  ogImage: "/matthew-don.jpg",
  footer: "© {year} Matthew Don. All rights reserved.",
  socials: {
    instagram: {
      url: "https://www.instagram.com/hiimmattdon/",
      handle: "@hiimmattdon",
    },
    tiktok: {
      url: "https://www.tiktok.com/@hiimmattdon",
      handle: "@hiimmattdon",
    },
    amazon: {
      url: "https://www.amazon.com/stores/Matthew-Don/author/B00YF2KSWO",
      label: "Amazon Author Page",
    },
    goodreads: {
      url: "https://www.goodreads.com/author/show/21029434.Matthew_Don",
      label: "Goodreads Profile",
    },
  },
  contact: {
    email: "admin@matthewdon.com",
    message: "Have questions? Want to say hi? Message me on Instagram or TikTok!",
    preferredMethods: ["instagram", "tiktok"],
  },
}

export const DEFAULT_MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

async function fetchSiteSettingsFromDb(): Promise<SiteSettings> {
  try {
    const row = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, "default"),
    })
    if (!row) {
      return DEFAULT_SITE_SETTINGS
    }
    return {
      id: row.id,
      name: row.name || DEFAULT_SITE_SETTINGS.name,
      tagline: row.tagline || DEFAULT_SITE_SETTINGS.tagline,
      canonicalUrl: row.canonicalUrl || DEFAULT_SITE_SETTINGS.canonicalUrl,
      ogImage: row.ogImage || DEFAULT_SITE_SETTINGS.ogImage,
      footer: row.footer || DEFAULT_SITE_SETTINGS.footer,
      socials: row.socials ?? DEFAULT_SITE_SETTINGS.socials,
      contact: row.contact ?? DEFAULT_SITE_SETTINGS.contact,
    }
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

async function fetchNavItemsFromDb(section = "main"): Promise<NavItem[]> {
  try {
    const rows = await db.query.navItems.findMany({
      where: and(eq(navItems.section, section), eq(navItems.visible, true)),
      orderBy: [asc(navItems.order)],
    })
    if (!rows || rows.length === 0) {
      if (section === "main") {
        return DEFAULT_MAIN_NAV
      }
      return []
    }
    return rows.map((row) => ({
      label: row.label,
      href: row.href,
      external: row.external,
      description: row.description ?? undefined,
    }))
  } catch {
    if (section === "main") {
      return DEFAULT_MAIN_NAV
    }
    return []
  }
}

const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromDb,
  ["site-settings-record"],
  { tags: [SITE_SETTINGS_CACHE_TAG] },
)

const getCachedNavItems = unstable_cache(
  fetchNavItemsFromDb,
  ["site-nav-items-record"],
  { tags: [SITE_SETTINGS_CACHE_TAG] },
)

export async function getSiteSettings(): Promise<SiteSettings> {
  return getCachedSiteSettings()
}

export async function getNavItems(section = "main"): Promise<NavItem[]> {
  return getCachedNavItems(section)
}

export async function getMainNav(): Promise<NavItem[]> {
  return getNavItems("main")
}

export async function getAllDbNavItems(): Promise<DbNavItem[]> {
  try {
    const rows = await db.query.navItems.findMany({
      orderBy: [asc(navItems.section), asc(navItems.order)],
    })
    return rows as DbNavItem[]
  } catch {
    return []
  }
}
