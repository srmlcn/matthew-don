"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "@/lib/db/client"
import { newsletterSubscribers } from "@/lib/db/schema"

// In-memory sliding rate limiter: ip -> array of request timestamps in ms
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5
const ipTimestamps = new Map<string, number[]>()

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const now = Date.now()
  const timestamps = ipTimestamps.get(identifier) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    ipTimestamps.set(identifier, recent)
    return false
  }

  recent.push(now)
  ipTimestamps.set(identifier, recent)
  return true
}

const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(300),
  source: z.string().trim().max(100).optional().default("website"),
})

export async function subscribeNewsletter(
  input: unknown,
  clientIp = "anonymous",
): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  if (!(await checkRateLimit(clientIp))) {
    return { ok: false, error: "Too many subscription attempts. Please wait a minute and try again." }
  }

  const parsed = subscribeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email address" }
  }

  const email = parsed.data.email.toLowerCase()
  const source = parsed.data.source

  try {
    const existing = await db.query.newsletterSubscribers.findFirst({
      where: eq(newsletterSubscribers.email, email),
    })

    if (existing) {
      if (existing.status !== "active") {
        await db
          .update(newsletterSubscribers)
          .set({ status: "active", updatedAt: new Date() })
          .where(eq(newsletterSubscribers.id, existing.id))
      }
      return { ok: true, message: "You're already subscribed!" }
    }

    await db.insert(newsletterSubscribers).values({
      email,
      source,
      status: "active",
    })

    return { ok: true, message: "Thanks for subscribing!" }
  } catch (err) {
    console.error("Newsletter subscription error:", err)
    return { ok: true, message: "Thanks for subscribing!" }
  }
}

async function isAdmin(): Promise<boolean> {
  const { isAuthenticated } = getKindeServerSession()
  return (await isAuthenticated()) ?? false
}

export async function updateSubscriberStatus(
  id: number,
  status: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  await db
    .update(newsletterSubscribers)
    .set({ status, updatedAt: new Date() })
    .where(eq(newsletterSubscribers.id, id))

  return { ok: true }
}

export async function deleteSubscriber(
  id: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }

  await db
    .delete(newsletterSubscribers)
    .where(eq(newsletterSubscribers.id, id))

  return { ok: true }
}
