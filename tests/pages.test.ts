import { describe, it } from "node:test"
import assert from "node:assert/strict"
import {
  DEFAULT_PAGES,
  DEFAULT_PAGE_SECTIONS,
  PAGES_CACHE_TAG,
  PAGE_SECTIONS_CACHE_TAG,
  getAllDbPageSections,
  getAllDbPages,
  getPage,
  getPages,
  getPageSection,
  getPageSectionMap,
  getPageSections,
} from "@/lib/data/pages"
import {
  createPageSection,
  deletePageSection,
  reorderPageSections,
  toggleSectionVisibility,
  updatePageSection,
} from "@/app/(admin)/admin/pages/actions"

describe("Page sections CMS data layer and cache tags", () => {
  it("defines cache tags for pages and page sections", () => {
    assert.equal(PAGES_CACHE_TAG, "pages")
    assert.equal(PAGE_SECTIONS_CACHE_TAG, "page-sections")
  })

  it("provides valid default pages", () => {
    assert.ok(DEFAULT_PAGES.length >= 3)
    const pageIds = DEFAULT_PAGES.map((p) => p.id)
    assert.ok(pageIds.includes("home"))
    assert.ok(pageIds.includes("about"))
    assert.ok(pageIds.includes("contact"))
  })

  it("provides valid default page sections with structured paragraphs", () => {
    const homeSections = DEFAULT_PAGE_SECTIONS["home"]
    assert.ok(homeSections)
    assert.ok(homeSections.length >= 3)

    const hero = homeSections.find((s) => s.sectionKey === "hero")
    assert.ok(hero)
    assert.ok(hero.content.paragraphs.length > 0)
    // Verify structured paragraphs contain no raw HTML tags
    for (const p of hero.content.paragraphs) {
      assert.ok(!p.includes("<p>"))
      assert.ok(!p.includes("<div>"))
      assert.ok(!p.includes("</span>"))
    }
    assert.ok(hero.content.primaryCta?.href)
    assert.ok(hero.content.primaryCta?.label)

    const newsletter = homeSections.find((s) => s.sectionKey === "newsletter")
    assert.ok(newsletter)
    assert.ok(newsletter.content.title)
    assert.ok(newsletter.content.placeholder)

    const invitation = homeSections.find((s) => s.sectionKey === "invitation")
    assert.ok(invitation)
    assert.ok(invitation.content.primaryCta?.label)

    const aboutBio = DEFAULT_PAGE_SECTIONS["about"]?.find(
      (s) => s.sectionKey === "bio",
    )
    assert.ok(aboutBio)
    assert.equal(aboutBio.content.paragraphs.length, 4)
    for (const p of aboutBio.content.paragraphs) {
      assert.ok(!p.includes("<p>"))
      assert.ok(!p.includes("<div>"))
    }
    assert.ok(aboutBio.content.connectHeading)

    const contactIntro = DEFAULT_PAGE_SECTIONS["contact"]?.find(
      (s) => s.sectionKey === "intro",
    )
    assert.ok(contactIntro)
    assert.equal(contactIntro.content.paragraphs.length, 1)
    for (const p of contactIntro.content.paragraphs) {
      assert.ok(!p.includes("<p>"))
      assert.ok(!p.includes("<div>"))
    }
  })

  it("getPages falls back gracefully to default pages without db connection", async () => {
    const pages = await getPages()
    assert.ok(pages.length >= 3)
    assert.equal(pages[0]?.id, "home")
  })

  it("getPage returns page record by id", async () => {
    const home = await getPage("home")
    assert.ok(home)
    assert.equal(home.title, "Home")
    assert.equal(home.slug, "/")

    const nonexistent = await getPage("nonexistent-page")
    assert.equal(nonexistent, null)
  })

  it("getPageSections falls back gracefully without db connection", async () => {
    const sections = await getPageSections("home")
    assert.ok(sections.length >= 3)
    assert.equal(sections[0]?.sectionKey, "hero")
  })

  it("getPageSection returns specific section", async () => {
    const hero = await getPageSection("home", "hero")
    assert.ok(hero)
    assert.equal(hero.sectionKey, "hero")
    assert.ok(hero.content.paragraphs.length > 0)

    const bio = await getPageSection("about", "bio")
    assert.ok(bio)
    assert.equal(bio.sectionKey, "bio")
    assert.equal(bio.content.paragraphs.length, 4)

    const missing = await getPageSection("home", "nonexistent-key")
    assert.equal(missing, null)
  })

  it("getPageSectionMap returns map keyed by sectionKey", async () => {
    const map = await getPageSectionMap("home")
    assert.ok(map["hero"])
    assert.ok(map["newsletter"])
    assert.ok(map["invitation"])
    assert.equal(map["hero"].sectionKey, "hero")
  })

  it("getAllDbPages and getAllDbPageSections return fallback records without db connection", async () => {
    const dbPages = await getAllDbPages()
    assert.ok(dbPages.length >= 3)

    const allSections = await getAllDbPageSections()
    assert.ok(allSections.length >= 5)

    const aboutSections = await getAllDbPageSections("about")
    assert.equal(aboutSections.length, 1)
    assert.equal(aboutSections[0]?.sectionKey, "bio")
  })
})

describe("Page sections admin actions security", () => {
  it("rejects unauthenticated calls to updatePageSection", async () => {
    const result = await updatePageSection(1, {
      page: "home",
      sectionKey: "hero",
      content: { paragraphs: ["Hello world"] },
    })
    assert.equal(result.ok, false)
    assert.equal((result as { error: string }).error, "Unauthorized")
  })

  it("rejects unauthenticated calls to createPageSection", async () => {
    const result = await createPageSection({
      page: "home",
      sectionKey: "custom",
      content: { paragraphs: ["Test"] },
    })
    assert.equal(result.ok, false)
    assert.equal((result as { error: string }).error, "Unauthorized")
  })

  it("rejects unauthenticated calls to deletePageSection", async () => {
    const result = await deletePageSection(999)
    assert.equal(result.ok, false)
    assert.equal((result as { error: string }).error, "Unauthorized")
  })

  it("rejects unauthenticated calls to toggleSectionVisibility", async () => {
    const result = await toggleSectionVisibility(1, false)
    assert.equal(result.ok, false)
    assert.equal((result as { error: string }).error, "Unauthorized")
  })

  it("rejects unauthenticated calls to reorderPageSections", async () => {
    const result = await reorderPageSections([{ id: 1, sortOrder: 0 }])
    assert.equal(result.ok, false)
    assert.equal((result as { error: string }).error, "Unauthorized")
  })
})
