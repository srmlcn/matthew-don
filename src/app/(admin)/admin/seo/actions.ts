"use server"

import { revalidateTag, updateTag } from "next/cache"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "@/lib/db/client"
import { seoOverrides } from "@/lib/db/schema"
import { SEO_CACHE_TAG, getSeoCacheTag } from "@/lib/data/seo"

const seoOverrideSchema = z.object({
  entityType: z.string().trim().min(1),
  entityId: z.string().trim().min(1),
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  ogImage: z.string().trim().optional(),
  canonical: z.string().trim().optional(),
  noindex: z.boolean().default(false),
})

async function isAdmin(): Promise<boolean> {
  const { isAuthenticated } = getKindeServerSession()
  return (await isAuthenticated()) ?? false
}

function revalidateSeo(entityType: string, entityId: string): void {
  updateTag(SEO_CACHE_TAG)
  updateTag(getSeoCacheTag(entityType, entityId))
  revalidateTag(SEO_CACHE_TAG, "max")
  revalidateTag(getSeoCacheTag(entityType, entityId), "max")
}

export async function upsertSeoOverride(
  input: unknown,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = seoOverrideSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid data" }
  }

  const { entityType, entityId, title, description, ogImage, canonical, noindex } =
    parsed.data

  try {
    const existing = await db.query.seoOverrides.findFirst({
      where: and(
        eq(seoOverrides.entityType, entityType),
        eq(seoOverrides.entityId, entityId),
      ),
    })

    if (existing) {
      await db
        .update(seoOverrides)
        .set({
          title: title || null,
          description: description || null,
          ogImage: ogImage || null,
          canonical: canonical || null,
          noindex,
          updatedAt: new Date(),
        })
        .where(eq(seoOverrides.id, existing.id))
    } else {
      await db.insert(seoOverrides).values({
        entityType,
        entityId,
        title: title || null,
        description: description || null,
        ogImage: ogImage || null,
        canonical: canonical || null,
        noindex,
      })
    }

    revalidateSeo(entityType, entityId)
    return { ok: true }
  } catch (error) {
    console.error("Failed to upsert SEO override:", error)
    return { ok: false, error: "Failed to save SEO override" }
  }
}

export async function deleteSeoOverride(
  id: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const existing = await db.query.seoOverrides.findFirst({
    where: eq(seoOverrides.id, id),
    columns: { entityType: true, entityId: true },
  })
  if (!existing) {
    return { ok: false, error: "Override not found" }
  }

  await db.delete(seoOverrides).where(eq(seoOverrides.id, id))
  revalidateSeo(existing.entityType, existing.entityId)
  return { ok: true }
}
