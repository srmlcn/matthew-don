/**
 * Admin media API: list (GET) and upload to Vercel Blob (POST).
 */

import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "@/lib/db/client"
import { mediaAssets } from "@/lib/db/schema"
import { listMediaAssets } from "@/lib/media/assets"
import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  MEDIA_BLOB_PREFIX,
  getBlobToken,
  probeImageDimensions,
  uploadBufferToBlob,
} from "@/lib/media/blob"
import { altFromFilename, sanitizeFilename } from "@/lib/media/image"

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

function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

function missingEnv(name: string): NextResponse {
  return NextResponse.json(
    { error: `${name} is not configured` },
    { status: 503 },
  )
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return unauthorized()
  }
  if (!process.env["DATABASE_URL"]) {
    return missingEnv("DATABASE_URL")
  }

  const url = new URL(request.url)
  const query = url.searchParams.get("q") ?? undefined
  const limit = Number(url.searchParams.get("limit") ?? 60)
  const offset = Number(url.searchParams.get("offset") ?? 0)

  try {
    const result = await listMediaAssets({
      query,
      limit: Number.isFinite(limit) ? limit : 60,
      offset: Number.isFinite(offset) ? offset : 0,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to list media assets", error)
    return NextResponse.json(
      { error: "Failed to list media assets" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return unauthorized()
  }
  if (!process.env["DATABASE_URL"]) {
    return missingEnv("DATABASE_URL")
  }
  if (!getBlobToken()) {
    return missingEnv("BLOB_READ_WRITE_TOKEN")
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = form.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 })
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported image type: ${file.type || "unknown"}` },
      { status: 400 },
    )
  }
  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File must be between 1 byte and ${MAX_UPLOAD_BYTES} bytes` },
      { status: 400 },
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const dimensions = probeImageDimensions(buffer)
  if (!dimensions) {
    return NextResponse.json(
      { error: "Could not read image dimensions" },
      { status: 400 },
    )
  }

  const rawAlt = form.get("alt")
  const filename = sanitizeFilename(file.name || "image")
  const alt =
    typeof rawAlt === "string" && rawAlt.trim()
      ? rawAlt.trim().slice(0, 300)
      : altFromFilename(filename)
  const pathname = `${MEDIA_BLOB_PREFIX}${Date.now()}-${filename}`

  try {
    const uploaded = await uploadBufferToBlob(
      pathname,
      buffer,
      file.type,
    )
    const [row] = await db
      .insert(mediaAssets)
      .values({
        pathname: uploaded.pathname,
        url: uploaded.url,
        filename: file.name || filename,
        alt,
        width: dimensions.width,
        height: dimensions.height,
        sizeBytes: file.size,
        contentType: file.type,
      })
      .returning()
    if (!row) {
      throw new Error("Insert returned no row")
    }
    return NextResponse.json({ asset: row }, { status: 201 })
  } catch (error) {
    console.error("Failed to upload media asset", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    )
  }
}
