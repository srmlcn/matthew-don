import { describe, it } from "node:test"
import assert from "node:assert/strict"
import {
  DEFAULT_MAIN_NAV,
  DEFAULT_SITE_SETTINGS,
  SITE_SETTINGS_CACHE_TAG,
  getSiteSettings,
  getMainNav,
  getNavItems,
} from "@/lib/data/settings"
import { getSiteConfig, siteConfig } from "@/lib/config/site"
import { resolveBookNavSection } from "@/lib/data/books/navigation"
import type { Book } from "@/lib/data/books/types"

function createMockBook(overrides: Partial<Book> = {}): Book {
  return {
    id: "test-book",
    slug: "test-book",
    title: "Test Book",
    status: "published",
    category: "adventures",
    featured: false,
    order: 1,
    shortDescription: "Short description",
    longDescription: ["Long description"],
    cover: {
      src: "/test-cover.jpg",
      alt: "Test cover",
      width: 1200,
      height: 1800,
    },
    previewImages: [],
    links: {},
    reviews: [],
    availability: "Available now",
    ...overrides,
  }
}

describe("Site settings data and config", () => {
  it("defines site-settings cache tag", () => {
    assert.equal(SITE_SETTINGS_CACHE_TAG, "site-settings")
  })

  it("provides valid default site settings", () => {
    assert.equal(DEFAULT_SITE_SETTINGS.name, "Matthew Don")
    assert.equal(DEFAULT_SITE_SETTINGS.canonicalUrl, "https://matthewdon.com")
    assert.ok(DEFAULT_SITE_SETTINGS.tagline.length > 0)
    assert.ok(DEFAULT_SITE_SETTINGS.ogImage.length > 0)
    assert.ok(DEFAULT_SITE_SETTINGS.footer.includes("{year}"))
    assert.ok(DEFAULT_SITE_SETTINGS.socials.instagram?.url)
    assert.ok(DEFAULT_SITE_SETTINGS.socials.tiktok?.url)
  })

  it("provides valid default main nav items", () => {
    assert.equal(DEFAULT_MAIN_NAV.length, 3)
    assert.deepEqual(
      DEFAULT_MAIN_NAV.map((i) => i.label),
      ["Home", "About", "Contact"],
    )
  })

  it("getSiteSettings falls back gracefully without db connection", async () => {
    const settings = await getSiteSettings()
    assert.ok(settings)
    assert.equal(settings.name, "Matthew Don")
    assert.equal(settings.canonicalUrl, "https://matthewdon.com")
  })

  it("getMainNav falls back to default main nav without db connection", async () => {
    const nav = await getMainNav()
    assert.ok(nav.length >= 3)
    assert.equal(nav[0]?.label, "Home")
  })

  it("getNavItems returns empty array for non-existent section fallback", async () => {
    const nav = await getNavItems("non-existent-section")
    assert.deepEqual(nav, [])
  })

  it("getSiteConfig resolves dynamic settings and updates copyright year", async () => {
    const resolved = await getSiteConfig()
    const currentYear = new Date().getFullYear()
    assert.equal(resolved.name, "Matthew Don")
    assert.equal(resolved.canonicalUrl, "https://matthewdon.com")
    assert.equal(resolved.copyright.year, currentYear)
    assert.ok(resolved.copyright.message.includes(String(currentYear)))
    assert.ok(!resolved.copyright.message.includes("{year}"))
  })

  it("siteConfig includes canonicalUrl", () => {
    assert.equal(siteConfig.canonicalUrl, "https://matthewdon.com")
  })
})

describe("Book navigation per-book nav_section override", () => {
  it("uses explicit navSection override when provided", () => {
    const book = createMockBook({
      navSection: "Custom Section",
    })
    const resolved = resolveBookNavSection(book)
    assert.equal(resolved, "Custom Section")
  })

  it("excludes upcoming books regardless of category", () => {
    const book = createMockBook({
      status: "upcoming",
      category: "adventures",
    })
    const resolved = resolveBookNavSection(book)
    assert.equal(resolved, null)
  })

  it("excludes books with navSection set to 'none'", () => {
    const book = createMockBook({
      navSection: "none",
    })
    const resolved = resolveBookNavSection(book)
    assert.equal(resolved, null)
  })

  it("falls back to seriesInfo.name when navSection is not set", () => {
    const book = createMockBook({
      seriesInfo: {
        name: "Custom Series Name",
        book: 1,
        total: 3,
      },
    })
    const resolved = resolveBookNavSection(book)
    assert.equal(resolved, "Custom Series Name")
  })

  it("falls back to 'Mature Readers' for comedy books without navSection", () => {
    const book = createMockBook({
      category: "comedy",
    })
    const resolved = resolveBookNavSection(book)
    assert.equal(resolved, "Mature Readers")
  })

  it("falls back to 'The Adventures of Luca and Kai' for adventures/comics without navSection", () => {
    const adventuresBook = createMockBook({ category: "adventures" })
    assert.equal(
      resolveBookNavSection(adventuresBook),
      "The Adventures of Luca and Kai",
    )

    const comicsBook = createMockBook({ category: "comics" })
    assert.equal(
      resolveBookNavSection(comicsBook),
      "The Adventures of Luca and Kai",
    )
  })
})
