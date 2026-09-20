/**
 * Admin media-asset queries (uncached, direct from Neon + Drizzle).
 */

import { count, desc, ilike, or } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { mediaAssets } from "@/lib/db/schema"

export interface MediaAsset {
  id: number
  pathname: string
  url: string
  filename: string
  alt: string
  width: number
  height: number
  sizeBytes: number
  contentType: string
  createdAt: Date
}

export interface MediaAssetList {
  assets: MediaAsset[]
  total: number
}

function mapRow(row: typeof mediaAssets.$inferSelect): MediaAsset {
  return {
    id: row.id,
    pathname: row.pathname,
    url: row.url,
    filename: row.filename,
    alt: row.alt,
    width: row.width,
    height: row.height,
    sizeBytes: row.sizeBytes,
    contentType: row.contentType,
    createdAt: row.createdAt,
  }
}

export async function listMediaAssets(options?: {
  query?: string
  limit?: number
  offset?: number
}): Promise<MediaAssetList> {
  const limit = Math.min(Math.max(options?.limit ?? 60, 1), 100)
  const offset = Math.max(options?.offset ?? 0, 0)
  const search = options?.query?.trim()

  const where = search
    ? or(
        ilike(mediaAssets.filename, `%${search}%`),
        ilike(mediaAssets.alt, `%${search}%`),
      )
    : undefined

  const [rows, totalRows] = await Promise.all([
    db.query.mediaAssets.findMany({
      where,
      orderBy: [desc(mediaAssets.createdAt)],
      limit,
      offset,
    }),
    db.select({ value: count() }).from(mediaAssets).where(where),
  ])

  return {
    assets: rows.map(mapRow),
    total: totalRows[0]?.value ?? 0,
  }
}

export async function getMediaAsset(
  id: number,
): Promise<MediaAsset | undefined> {
  const row = await db.query.mediaAssets.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
  return row ? mapRow(row) : undefined
}
