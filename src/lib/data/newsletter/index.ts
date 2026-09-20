import { desc, eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { newsletterSubscribers } from "@/lib/db/schema"

export interface NewsletterSubscriberItem {
  id: number
  email: string
  status: string
  source: string
  createdAt: Date
  updatedAt: Date
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriberItem[]> {
  try {
    const rows = await db.query.newsletterSubscribers.findMany({
      orderBy: [desc(newsletterSubscribers.createdAt)],
    })
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      status: r.status,
      source: r.source,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }))
  } catch {
    return []
  }
}
