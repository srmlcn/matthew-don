/**
 * Backfill public images to Vercel Blob + media_assets, rewrite book_images.src.
 * Rerunnable and idempotent (stable media/<path> pathnames, allowOverwrite).
 *
 * Targets: public/adventures/*, public/celebration/*, public/matthew-don.jpg,
 * public/profile-picture.png. Public files are kept as fallback; only DB rows
 * with a successful Blob upload are rewritten.
 *
 * Usage: pnpm media:backfill (requires DATABASE_URL + BLOB_READ_WRITE_TOKEN)
 */

import { config as loadEnv } from "dotenv"
import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join, extname } from "node:path"
import { neon } from "@neondatabase/serverless"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../src/lib/db/schema"
import { bookImages, mediaAssets } from "../src/lib/db/schema"
import { probeImageDimensions } from "../src/lib/media/blob"
import { altFromFilename } from "../src/lib/media/image"

loadEnv({ path: ".env.local" })
loadEnv()

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
}

const BATCH_SIZE = 5

interface SeedImage {
  src: string
  alt: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

function loadSeedAltMap(): Map<string, string> {
  const seedPath = join(process.cwd(), "src/lib/db/seed-data/books.json")
  const books = JSON.parse(readFileSync(seedPath, "utf-8")) as Array<{
    cover: SeedImage
    previewImages: SeedImage[]
  }>
  const map = new Map<string, string>()
  for (const book of books) {
    if (book.cover) {
      map.set(book.cover.src, book.cover.alt)
    }
    for (const preview of book.previewImages ?? []) {
      map.set(preview.src, preview.alt)
    }
  }
  return map
}

function collectTargets(): Array<{ relative: string; absolute: string }> {
  const targets: Array<{ relative: string; absolute: string }> = []
  const publicDir = join(process.cwd(), "public")

  for (const dir of ["adventures", "celebration"]) {
    const full = join(publicDir, dir)
    if (!existsSync(full)) {
      continue
    }
    for (const entry of readdirSync(full)) {
      const extension = extname(entry).toLowerCase()
      if (!IMAGE_CONTENT_TYPES[extension]) {
        continue
      }
      targets.push({
        relative: `${dir}/${entry}`,
        absolute: join(full, entry),
      })
    }
  }

  for (const file of ["matthew-don.jpg", "profile-picture.png"]) {
    const absolute = join(publicDir, file)
    if (!existsSync(absolute)) {
      console.warn(`Skipping missing profile image: ${file}`)
      continue
    }
    targets.push({ relative: file, absolute })
  }

  return targets.sort((a, b) => a.relative.localeCompare(b.relative))
}

async function backfill(): Promise<void> {
  getRequiredEnv("DATABASE_URL")
  getRequiredEnv("BLOB_READ_WRITE_TOKEN")
  const { put } = await import("@vercel/blob")

  const sql = neon(process.env["DATABASE_URL"] as string)
  const db = drizzle(sql, { schema })
  const seedAlts = loadSeedAltMap()
  const targets = collectTargets()
  console.log(`Found ${targets.length} public images to backfill`)

  const srcToUrl = new Map<string, string>()
  let uploaded = 0

  for (let index = 0; index < targets.length; index += BATCH_SIZE) {
    const batch = targets.slice(index, index + BATCH_SIZE)
    await Promise.all(
      batch.map(async (target) => {
        const buffer = readFileSync(target.absolute)
        const dimensions = probeImageDimensions(buffer)
        if (!dimensions) {
          console.warn(`Skipping unreadable image: ${target.relative}`)
          return
        }
        const publicSrc = `/${target.relative}`
        const extension = extname(target.relative).toLowerCase()
        const contentType =
          IMAGE_CONTENT_TYPES[extension] ?? "application/octet-stream"
        const pathname = `media/${target.relative}`
        const filename = target.relative.split("/").pop() ?? target.relative
        const alt = seedAlts.get(publicSrc) ?? altFromFilename(filename)

        const blob = await put(pathname, buffer, {
          access: "public",
          contentType,
          addRandomSuffix: false,
          allowOverwrite: true,
        })

        await db
          .insert(mediaAssets)
          .values({
            pathname: blob.pathname,
            url: blob.url,
            filename,
            alt,
            width: dimensions.width,
            height: dimensions.height,
            sizeBytes: buffer.length,
            contentType,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: mediaAssets.pathname,
            set: {
              url: blob.url,
              filename,
              alt,
              width: dimensions.width,
              height: dimensions.height,
              sizeBytes: buffer.length,
              contentType,
              updatedAt: new Date(),
            },
          })

        srcToUrl.set(publicSrc, blob.url)
        uploaded += 1
        console.log(`Uploaded ${publicSrc} -> ${blob.url}`)
      }),
    )
  }

  const rows = await db
    .select({ id: bookImages.id, src: bookImages.src })
    .from(bookImages)
  let rewritten = 0
  for (const row of rows) {
    const blobUrl = srcToUrl.get(row.src)
    if (!blobUrl) {
      continue
    }
    await db
      .update(bookImages)
      .set({ src: blobUrl })
      .where(eq(bookImages.id, row.id))
    rewritten += 1
  }

  const missing = rows.filter(
    (row) =>
      (row.src.startsWith("/adventures/") ||
        row.src.startsWith("/celebration/")) &&
      !srcToUrl.has(row.src),
  )
  for (const row of missing) {
    console.warn(`No Blob upload for book_images src, kept fallback: ${row.src}`)
  }

  console.log(
    `Backfill complete: ${uploaded} uploads, ${rewritten} book_images rows rewritten, ${missing.length} fallbacks kept`,
  )
}

backfill().catch((error) => {
  console.error(error)
  process.exit(1)
})
