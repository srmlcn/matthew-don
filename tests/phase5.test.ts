import { describe, it } from "node:test"
import assert from "node:assert/strict"
import {
  generateBookMetadata,
  getBookPageTitle,
} from "@/lib/data/books/metadata"
import type { Book } from "@/lib/data/books/types"
import { checkRateLimit, subscribeNewsletter } from "@/app/(admin)/admin/newsletter/actions"
import { getAdminBookReviews } from "@/lib/data/books/admin"
import { getSeoOverride, getAllSeoOverrides, SEO_CACHE_TAG } from "@/lib/data/seo"
import { getNewsletterSubscribers } from "@/lib/data/newsletter"

function createMockBook(overrides: Partial<Book> = {}): Book {
  return {
    id: "test-book-id",
    slug: "test-book-slug",
    title: "Test Book Title",
    status: "published",
    category: "adventures",
    featured: false,
    order: 1,
    shortDescription: "Short description text",
    longDescription: ["First paragraph of description.", "Second paragraph of description."],
    cover: {
      src: "/test-cover.jpg",
      alt: "Test cover alt",
      width: 1200,
      height: 1800,
    },
    previewImages: [],
    links: {},
    reviews: [
      {
        name: "Reviewer One",
        description: "Verified Reader",
        review: "Amazing book!",
        stars: 5,
        sortOrder: 0,
        isVisible: true,
      },
      {
        name: "Hidden Reviewer",
        description: "Spam",
        review: "Buy cheap crypto!",
        stars: 1,
        sortOrder: 1,
        isVisible: false,
      },
    ],
    availability: "Available now",
    ...overrides,
  }
}

describe("Phase 5: Reviews Moderation and Visibility", () => {
  it("getAdminBookReviews falls back gracefully when database is unreachable", async () => {
    const reviews = await getAdminBookReviews("non-existent-book")
    assert.deepEqual(reviews, [])
  })

  it("rejects unauthenticated mutations to reviews", async () => {
    const { createBookReview, updateBookReview, deleteBookReview } = await import(
      "@/app/(admin)/admin/books/actions"
    )
    const createRes = await createBookReview("book-1", {
      name: "Test",
      description: "Test",
      review: "Test",
      stars: 5,
    })
    assert.equal(createRes.ok, false)
    assert.equal(createRes.error, "Unauthorized")

    const updateRes = await updateBookReview(1, { name: "Test" })
    assert.equal(updateRes.ok, false)
    assert.equal(updateRes.error, "Unauthorized")

    const deleteRes = await deleteBookReview(1)
    assert.equal(deleteRes.ok, false)
    assert.equal(deleteRes.error, "Unauthorized")
  })

  it("mapBook filters out non-visible reviews", async () => {
    const { mapBook } = await import("@/lib/db/map-book")
    const mockDbRow: any = {
      id: "book-1",
      slug: "book-1",
      title: "Book 1",
      status: "published",
      category: "adventures",
      featured: false,
      order: 1,
      shortDescription: "Short",
      longDescription: ["Long"],
      availability: "Now",
      images: [
        {
          id: 1,
          bookId: "book-1",
          kind: "cover",
          src: "/cover.jpg",
          alt: "Cover",
          width: 100,
          height: 100,
          sortOrder: 0,
        },
      ],
      links: [],
      reviews: [
        {
          id: 1,
          bookId: "book-1",
          name: "Visible Person",
          description: "Top reader",
          review: "Great!",
          stars: 5,
          sortOrder: 0,
          isVisible: true,
        },
        {
          id: 2,
          bookId: "book-1",
          name: "Hidden Person",
          description: "Spam",
          review: "Spam text",
          stars: 1,
          sortOrder: 1,
          isVisible: false,
        },
      ],
    }

    const mapped = mapBook(mockDbRow)
    assert.equal(mapped.reviews.length, 1)
    assert.equal(mapped.reviews[0]?.name, "Visible Person")
  })
})

describe("Phase 5: Newsletter and Rate Limiter", () => {
  it("rejects unauthenticated mutations to newsletter subscribers", async () => {
    const { updateSubscriberStatus, deleteSubscriber } = await import(
      "@/app/(admin)/admin/newsletter/actions"
    )
    const updateRes = await updateSubscriberStatus(1, "unsubscribed")
    assert.equal(updateRes.ok, false)
    assert.equal(updateRes.error, "Unauthorized")

    const deleteRes = await deleteSubscriber(1)
    assert.equal(deleteRes.ok, false)
    assert.equal(deleteRes.error, "Unauthorized")
  })

  it("checkRateLimit allows requests up to max window and blocks excess", async () => {
    const testIp = `test-ip-${Date.now()}`
    // First 5 requests should pass
    for (let i = 0; i < 5; i++) {
      assert.equal(await checkRateLimit(testIp), true)
    }
    // 6th request within window should be rejected
    assert.equal(await checkRateLimit(testIp), false)
  })

  it("subscribeNewsletter validates email format", async () => {
    const res = await subscribeNewsletter({ email: "invalid-email" }, "valid-rate-ip")
    assert.equal(res.ok, false)
    if (!res.ok) {
      assert.ok(res.error.includes("valid email"))
    }
  })

  it("getNewsletterSubscribers falls back to empty list without database", async () => {
    const subscribers = await getNewsletterSubscribers()
    assert.ok(Array.isArray(subscribers))
  })
})

describe("Phase 5: SEO Overrides and Fallback Metadata", () => {
  it("rejects unauthenticated mutations to SEO overrides", async () => {
    const { upsertSeoOverride, deleteSeoOverride } = await import(
      "@/app/(admin)/admin/seo/actions"
    )
    const upsertRes = await upsertSeoOverride({
      entityType: "book",
      entityId: "book-1",
      title: "Custom Title",
    })
    assert.equal(upsertRes.ok, false)
    assert.equal(upsertRes.error, "Unauthorized")

    const deleteRes = await deleteSeoOverride(1)
    assert.equal(deleteRes.ok, false)
    assert.equal(deleteRes.error, "Unauthorized")
  })

  it("defines SEO cache tag", () => {
    assert.equal(SEO_CACHE_TAG, "seo-overrides")
  })

  it("getSeoOverride falls back gracefully when database is unreachable", async () => {
    const override = await getSeoOverride("book", "test-slug")
    assert.equal(override, null)
  })

  it("getAllSeoOverrides returns an array without crashing", async () => {
    const all = await getAllSeoOverrides()
    assert.ok(Array.isArray(all))
  })

  it("generateBookMetadata falls back to default book details when no override exists", async () => {
    const book = createMockBook()
    const metadata = await generateBookMetadata(book)
    assert.equal(metadata.title, getBookPageTitle(book))
    assert.equal(metadata.description, book.longDescription.join(" "))
    assert.equal(metadata.openGraph?.title, book.title)
    assert.equal(
      metadata.openGraph?.images?.[0] && typeof metadata.openGraph?.images[0] === "object"
        ? (metadata.openGraph?.images[0] as { url: string }).url
        : undefined,
      book.cover.src,
    )
  })
})
