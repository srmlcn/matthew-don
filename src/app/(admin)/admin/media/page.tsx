import type { Metadata } from "next"
import { Divider } from "@/components/ui/divider"
import type { MediaAsset } from "@/lib/media/assets"
import { MediaLibrary } from "./components/media-library"

export const metadata: Metadata = {
  title: "Media",
}

export default async function AdminMediaPage() {
  let assets: MediaAsset[] = []
  let total = 0
  let dbConfigured = Boolean(process.env["DATABASE_URL"])

  if (dbConfigured) {
    try {
      const { listMediaAssets } = await import("@/lib/media/assets")
      const result = await listMediaAssets({ limit: 60 })
      assets = result.assets
      total = result.total
    } catch (error) {
      console.error("Failed to load media assets", error)
      dbConfigured = false
    }
  }

  const blobConfigured = Boolean(process.env["BLOB_READ_WRITE_TOKEN"])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Media</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Blob-backed library for covers, previews, and photos. Public files
          under /adventures and /celebration keep working during transition.
        </p>
      </div>
      <Divider />
      {dbConfigured ? (
        <MediaLibrary
          initialAssets={assets}
          initialTotal={total}
          blobConfigured={blobConfigured}
        />
      ) : (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          DATABASE_URL is not configured. Media library needs Postgres.
        </p>
      )}
    </div>
  )
}
