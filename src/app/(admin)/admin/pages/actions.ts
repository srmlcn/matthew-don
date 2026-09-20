/**
 * Page and page section mutations (server actions).
 */

"use server"

import { revalidateTag, updateTag } from "next/cache"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { desc, eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "@/lib/db/client"
import { pageSections } from "@/lib/db/schema"
import {
  PAGE_SECTIONS_CACHE_TAG,
  PAGES_CACHE_TAG,
} from "@/lib/data/pages"

export type ActionResult<T = unknown> =
  | ({ ok: true } & T)
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

async function isAdmin(): Promise<boolean> {
  const { isAuthenticated } = getKindeServerSession()
  return (await isAuthenticated()) ?? false
}

function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "_form"
    const existing = fieldErrors[key]
    if (existing) {
      existing.push(issue.message)
    } else {
      fieldErrors[key] = [issue.message]
    }
  }
  return fieldErrors
}

const sectionCtaSchema = z
  .object({
    label: z.string().trim().max(100),
    href: z.string().trim().max(500),
    variant: z.enum(["default", "outline", "ghost"]).optional(),
  })
  .optional()

const sectionImageSchema = z
  .object({
    src: z.string().trim().max(500),
    alt: z.string().trim().max(200),
    width: z.coerce.number().int().positive().optional(),
    height: z.coerce.number().int().positive().optional(),
  })
  .optional()

const pageSectionContentSchema = z.object({
  title: z.string().trim().max(200).optional(),
  subtitle: z.string().trim().max(500).optional(),
  paragraphs: z.array(z.string().trim()),
  primaryCta: sectionCtaSchema,
  secondaryCta: sectionCtaSchema,
  image: sectionImageSchema,
  connectHeading: z.string().trim().max(100).optional(),
  footnote: z.string().trim().max(500).optional(),
  placeholder: z.string().trim().max(200).optional(),
  successMessage: z.string().trim().max(500).optional(),
})

const pageSectionFormSchema = z.object({
  page: z.string().trim().min(1, "Page identifier is required").max(50),
  sectionKey: z.string().trim().min(1, "Section key is required").max(50),
  sortOrder: z.coerce.number().int().min(0).max(100000).optional(),
  isVisible: z.boolean().default(true),
  content: pageSectionContentSchema,
})

export type PageSectionFormData = z.infer<typeof pageSectionFormSchema>

function revalidatePages(): void {
  try {
    updateTag(PAGES_CACHE_TAG)
    updateTag(PAGE_SECTIONS_CACHE_TAG)
  } catch {
    // updateTag may throw in some test contexts
  }
  revalidateTag(PAGES_CACHE_TAG, "max")
  revalidateTag(PAGE_SECTIONS_CACHE_TAG, "max")
}

export async function updatePageSection(
  id: number,
  input: unknown,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = pageSectionFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }

  const data = parsed.data

  const existing = await db.query.pageSections.findFirst({
    where: eq(pageSections.id, id),
    columns: { id: true, sortOrder: true },
  })

  if (existing) {
    await db
      .update(pageSections)
      .set({
        page: data.page,
        sectionKey: data.sectionKey,
        content: data.content,
        sortOrder: data.sortOrder ?? existing.sortOrder,
        isVisible: data.isVisible,
        updatedAt: new Date(),
      })
      .where(eq(pageSections.id, id))
  } else {
    // If updating by section key fallback when id doesn't exist in DB
    await db
      .insert(pageSections)
      .values({
        page: data.page,
        sectionKey: data.sectionKey,
        content: data.content,
        sortOrder: data.sortOrder ?? 0,
        isVisible: data.isVisible,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [pageSections.page, pageSections.sectionKey],
        set: {
          content: data.content,
          sortOrder: data.sortOrder,
          isVisible: data.isVisible,
          updatedAt: new Date(),
        },
      })
  }

  revalidatePages()
  return { ok: true }
}

export async function createPageSection(
  input: unknown,
): Promise<ActionResult<{ id: number }>> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = pageSectionFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }

  const data = parsed.data

  let sortOrder = data.sortOrder
  if (sortOrder === undefined) {
    const highest = await db.query.pageSections.findFirst({
      where: eq(pageSections.page, data.page),
      orderBy: [desc(pageSections.sortOrder)],
      columns: { sortOrder: true },
    })
    sortOrder = highest ? highest.sortOrder + 1 : 0
  }

  const [inserted] = await db
    .insert(pageSections)
    .values({
      page: data.page,
      sectionKey: data.sectionKey,
      content: data.content,
      sortOrder,
      isVisible: data.isVisible,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [pageSections.page, pageSections.sectionKey],
      set: {
        content: data.content,
        sortOrder,
        isVisible: data.isVisible,
        updatedAt: new Date(),
      },
    })
    .returning({ id: pageSections.id })

  if (!inserted) {
    return { ok: false, error: "Failed to create page section" }
  }

  revalidatePages()
  return { ok: true, id: inserted.id }
}

export async function deletePageSection(id: number): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const existing = await db.query.pageSections.findFirst({
    where: eq(pageSections.id, id),
    columns: { id: true },
  })

  if (!existing) {
    return { ok: false, error: "Page section not found" }
  }

  await db.delete(pageSections).where(eq(pageSections.id, id))

  revalidatePages()
  return { ok: true }
}

export async function toggleSectionVisibility(
  id: number,
  isVisible: boolean,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const existing = await db.query.pageSections.findFirst({
    where: eq(pageSections.id, id),
    columns: { id: true },
  })

  if (!existing) {
    return { ok: false, error: "Page section not found" }
  }

  await db
    .update(pageSections)
    .set({ isVisible, updatedAt: new Date() })
    .where(eq(pageSections.id, id))

  revalidatePages()
  return { ok: true }
}

export async function reorderPageSections(
  items: Array<{ id: number; sortOrder: number }>,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  await Promise.all(
    items.map((item) =>
      db
        .update(pageSections)
        .set({ sortOrder: item.sortOrder, updatedAt: new Date() })
        .where(eq(pageSections.id, item.id)),
    ),
  )

  revalidatePages()
  return { ok: true }
}
