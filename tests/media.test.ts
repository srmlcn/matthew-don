import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { probeImageDimensions } from "@/lib/media/blob"
import {
  altFromFilename,
  isBlobUrl,
  sanitizeFilename,
} from "@/lib/media/image"

describe("probeImageDimensions", () => {
  it("probes JPEG dimensions correctly", () => {
    const file = join(process.cwd(), "public/adventures/book1-cover.jpg")
    const buffer = readFileSync(file)
    const result = probeImageDimensions(buffer)
    assert.ok(result)
    assert.equal(result.width, 1169)
    assert.equal(result.height, 1749)
  })

  it("probes PNG dimensions correctly", () => {
    const file = join(process.cwd(), "public/adventures/book1-3.png")
    const buffer = readFileSync(file)
    const result = probeImageDimensions(buffer)
    assert.ok(result)
    assert.ok(result.width > 0)
    assert.ok(result.height > 0)
  })

  it("returns null for non-image buffer", () => {
    const buffer = Buffer.from("not an image at all")
    const result = probeImageDimensions(buffer)
    assert.equal(result, null)
  })

  it("returns null for empty buffer", () => {
    const buffer = Buffer.alloc(0)
    const result = probeImageDimensions(buffer)
    assert.equal(result, null)
  })
})

describe("sanitizeFilename", () => {
  it("converts spaces and special characters to hyphens and lowercases", () => {
    assert.equal(
      sanitizeFilename("My Cover Image (1)!.JPG"),
      "my-cover-image-1.jpg",
    )
  })

  it("handles filenames without extensions", () => {
    assert.equal(sanitizeFilename("Raw Image File"), "raw-image-file")
  })

  it("falls back to 'image' when only invalid characters are supplied", () => {
    assert.equal(sanitizeFilename("!@#$%^&*()"), "image")
  })

  it("truncates excessively long base names", () => {
    const longName = "a".repeat(120) + ".png"
    const result = sanitizeFilename(longName)
    assert.ok(result.endsWith(".png"))
    assert.ok(result.length <= 90)
  })
})

describe("altFromFilename", () => {
  it("converts dashes and underscores to capitalized words", () => {
    assert.equal(altFromFilename("book1-cover.jpg"), "Book1 cover")
    assert.equal(
      altFromFilename("moon_queen_preview_1.png"),
      "Moon queen preview 1",
    )
  })

  it("handles empty or extension-only filenames", () => {
    assert.equal(altFromFilename(".jpg"), "Image")
  })
})

describe("isBlobUrl", () => {
  it("identifies Vercel Blob storage URLs", () => {
    assert.equal(
      isBlobUrl("https://abc123.public.blob.vercel-storage.com/media/test.jpg"),
      true,
    )
  })

  it("rejects local public paths", () => {
    assert.equal(isBlobUrl("/adventures/book1-cover.jpg"), false)
  })

  it("rejects external non-blob URLs", () => {
    assert.equal(isBlobUrl("https://images.unsplash.com/photo-123"), false)
  })
})

describe("backfill asset targets", () => {
  it("verifies public targets exist for adventures and celebration", () => {
    const publicDir = join(process.cwd(), "public")
    assert.ok(existsSync(join(publicDir, "adventures")))
    assert.ok(existsSync(join(publicDir, "celebration")))
    assert.ok(existsSync(join(publicDir, "matthew-don.jpg")))
    assert.ok(existsSync(join(publicDir, "profile-picture.png")))
  })
})
