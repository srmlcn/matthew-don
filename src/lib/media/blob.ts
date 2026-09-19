/**
 * Vercel Blob wrappers (server-only).
 */

import { del, put } from "@vercel/blob"
import { imageSize } from "image-size"

export const MEDIA_BLOB_PREFIX = "media/"
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
])

export interface ProbedImage {
  width: number
  height: number
}

export function getBlobToken(): string | null {
  const token = process.env["BLOB_READ_WRITE_TOKEN"]
  return token && token.trim() ? token : null
}

export function probeImageDimensions(buffer: Buffer): ProbedImage | null {
  try {
    const result = imageSize(buffer)
    if (
      typeof result.width === "number" &&
      typeof result.height === "number" &&
      result.width > 0 &&
      result.height > 0
    ) {
      return { width: result.width, height: result.height }
    }
    return null
  } catch {
    return null
  }
}

export async function uploadBufferToBlob(
  pathname: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string; pathname: string }> {
  const blob = await put(pathname, buffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteBlobUrl(url: string): Promise<void> {
  await del(url)
}
