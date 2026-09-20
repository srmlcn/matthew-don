import { unstable_cache } from "next/cache"
import { and, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { seoOverrides } from "@/lib/db/schema"

export const SEO_CACHE_TAG = "seo-overrides"

export function getSeoCacheTag(entityType: string, entityId: string): string {
  return `seo:${entityType}:${entityId}`
}

export interface SeoOverrideItem {
  id: number
  entityType: string
  entityId: string
  title: string | null
  description: string | null
  ogImage: string | null
  canonical: string | null
  noindex: boolean
  createdAt: Date
  updatedAt: Date
}

async function fetchSeoOverrideFromDb(
  entityType: string,
  entityId: string,
): Promise<SeoOverrideItem | null> {
  try {
    const row = await db.query.seoOverrides.findFirst({
      where: and(
        eq(seoOverrides.entityType, entityType),
        eq(seoOverrides.entityId, entityId),
      ),
    })
    return row ?? null
  } catch {
    return null
  }
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

export async function getSeoOverride(
  entityType: string,
  entityId: string,
): Promise<SeoOverrideItem | null> {
  const cachedFn = safeCache(
    () => fetchSeoOverrideFromDb(entityType, entityId),
    ["seo-override-record", entityType, entityId],
    { tags: [SEO_CACHE_TAG, getSeoCacheTag(entityType, entityId)] },
  )
  return cachedFn()
}

export async function getAllSeoOverrides(): Promise<SeoOverrideItem[]> {
  try {
    return await db.query.seoOverrides.findMany()
  } catch {
    return []
  }
}
