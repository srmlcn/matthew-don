/**
 * Site settings and navigation mutations (server actions).
 */

"use server"

import { revalidateTag, updateTag } from "next/cache"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { asc, desc, eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "@/lib/db/client"
import { navItems, siteSettings } from "@/lib/db/schema"
import { SITE_SETTINGS_CACHE_TAG } from "@/lib/data/settings"

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

const siteSettingsFormSchema = z.object({
  name: z.string().trim().min(1, "Site name is required").max(100),
  tagline: z.string().trim().min(1, "Tagline is required").max(300),
  canonicalUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(300),
  ogImage: z.string().trim().min(1, "OG image is required").max(500),
  footer: z.string().trim().min(1, "Footer text is required").max(500),
  socials: z.object({
    instagram: z
      .object({
        url: z.string().trim().max(300).default(""),
        handle: z.string().trim().max(100).default(""),
      })
      .optional(),
    tiktok: z
      .object({
        url: z.string().trim().max(300).default(""),
        handle: z.string().trim().max(100).default(""),
      })
      .optional(),
    amazon: z
      .object({
        url: z.string().trim().max(300).default(""),
        label: z.string().trim().max(100).default(""),
      })
      .optional(),
    goodreads: z
      .object({
        url: z.string().trim().max(300).default(""),
        label: z.string().trim().max(100).default(""),
      })
      .optional(),
  }),
  contact: z.object({
    email: z.string().trim().max(200).optional(),
    message: z.string().trim().max(1000).optional(),
    preferredMethods: z.array(z.string()).optional(),
  }),
})

export type SiteSettingsFormData = z.infer<typeof siteSettingsFormSchema>

const navItemFormSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(100),
  href: z.string().trim().min(1, "Target href is required").max(500),
  section: z.string().trim().min(1).max(50).default("main"),
  order: z.coerce.number().int().min(0).max(100000).optional(),
  external: z.boolean().default(false),
  description: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((val) => (val && val.length > 0 ? val : null)),
  visible: z.boolean().default(true),
})

export type NavItemFormData = z.infer<typeof navItemFormSchema>

function revalidateSettings(): void {
  try {
    updateTag(SITE_SETTINGS_CACHE_TAG)
  } catch {
    // updateTag may throw in some test contexts
  }
  revalidateTag(SITE_SETTINGS_CACHE_TAG, "max")
}

export async function updateSiteSettings(
  input: unknown,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = siteSettingsFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }

  const data = parsed.data

  await db
    .insert(siteSettings)
    .values({
      id: "default",
      name: data.name,
      tagline: data.tagline,
      canonicalUrl: data.canonicalUrl,
      ogImage: data.ogImage,
      footer: data.footer,
      socials: data.socials,
      contact: data.contact,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        name: data.name,
        tagline: data.tagline,
        canonicalUrl: data.canonicalUrl,
        ogImage: data.ogImage,
        footer: data.footer,
        socials: data.socials,
        contact: data.contact,
        updatedAt: new Date(),
      },
    })

  revalidateSettings()
  return { ok: true }
}

export async function createNavItem(
  input: unknown,
): Promise<ActionResult<{ id: number }>> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = navItemFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }

  const data = parsed.data

  let order = data.order
  if (order === undefined) {
    const highest = await db.query.navItems.findFirst({
      where: eq(navItems.section, data.section),
      orderBy: [desc(navItems.order)],
      columns: { order: true },
    })
    order = highest ? highest.order + 1 : 0
  }

  const [inserted] = await db
    .insert(navItems)
    .values({
      label: data.label,
      href: data.href,
      section: data.section,
      order,
      external: data.external,
      description: data.description ?? null,
      visible: data.visible,
      updatedAt: new Date(),
    })
    .returning({ id: navItems.id })

  if (!inserted) {
    return { ok: false, error: "Failed to create navigation item" }
  }

  revalidateSettings()
  return { ok: true, id: inserted.id }
}

export async function updateNavItem(
  id: number,
  input: unknown,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const parsed = navItemFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: toFieldErrors(parsed.error),
    }
  }

  const data = parsed.data

  const existing = await db.query.navItems.findFirst({
    where: eq(navItems.id, id),
    columns: { id: true, order: true },
  })

  if (!existing) {
    return { ok: false, error: "Navigation item not found" }
  }

  await db
    .update(navItems)
    .set({
      label: data.label,
      href: data.href,
      section: data.section,
      order: data.order ?? existing.order,
      external: data.external,
      description: data.description ?? null,
      visible: data.visible,
      updatedAt: new Date(),
    })
    .where(eq(navItems.id, id))

  revalidateSettings()
  return { ok: true }
}

export async function deleteNavItem(id: number): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  const existing = await db.query.navItems.findFirst({
    where: eq(navItems.id, id),
    columns: { id: true },
  })

  if (!existing) {
    return { ok: false, error: "Navigation item not found" }
  }

  await db.delete(navItems).where(eq(navItems.id, id))

  revalidateSettings()
  return { ok: true }
}

export async function reorderNavItems(
  items: Array<{ id: number; order: number }>,
): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  await Promise.all(
    items.map((item) =>
      db
        .update(navItems)
        .set({ order: item.order, updatedAt: new Date() })
        .where(eq(navItems.id, item.id)),
    ),
  )

  revalidateSettings()
  return { ok: true }
}
