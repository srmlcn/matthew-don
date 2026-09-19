/**
 * Admin media API: delete a Blob asset by id.
 */

import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db/client"
import { mediaAssets } from "@/lib/db/schema"
import { deleteBlobUrl, getBlobToken } from "@/lib/media/blob"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

async function isAdmin(): Promise<boolean> {
  try {
    const { isAuthenticated } = getKindeServerSession()
    return (await isAuthenticated()) ?? false
  } catch {
    return false
  }
}

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!process.env["DATABASE_URL"]) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 },
    )
  }

  const { id } = await context.params
  const assetId = Number(id)
  if (!Number.isInteger(assetId) || assetId <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  const existing = await db.query.mediaAssets.findFirst({
    where: eq(mediaAssets.id, assetId),
  })
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (getBlobToken()) {
    try {
      await deleteBlobUrl(existing.url)
    } catch (error) {
      console.error("Failed to delete Blob object, removing row", error)
    }
  }
  await db.delete(mediaAssets).where(eq(mediaAssets.id, assetId))
  return NextResponse.json({ ok: true })
}
