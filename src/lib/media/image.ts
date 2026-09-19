/**
 * Pure media helpers (filename sanitizing, alt fallback, Blob URL check).
 */

const MAX_BASENAME_LENGTH = 80

export function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim().toLowerCase()
  const dotIndex = trimmed.lastIndexOf(".")
  const hasExtension = dotIndex > 0 && dotIndex < trimmed.length - 1
  const base = hasExtension ? trimmed.slice(0, dotIndex) : trimmed
  const extension = hasExtension ? trimmed.slice(dotIndex) : ""
  const cleanBase =
    base
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, MAX_BASENAME_LENGTH) || "image"
  const cleanExtension = extension.replace(/[^a-z0-9.]/g, "").slice(0, 10)
  return `${cleanBase}${cleanExtension}`
}

export function altFromFilename(filename: string): string {
  const dotIndex = filename.lastIndexOf(".")
  const base =
    dotIndex > 0 ? filename.slice(0, dotIndex) : filename
  const words = base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (!words) {
    return "Image"
  }
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export function isBlobUrl(src: string): boolean {
  return (
    src.startsWith("https://") && src.includes(".blob.vercel-storage.com/")
  )
}
