"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { MediaAsset } from "@/lib/media/assets"

interface MediaLibraryProps {
  initialAssets: MediaAsset[]
  initialTotal: number
  blobConfigured: boolean
  onSelect?: (asset: MediaAsset) => void
}

const PAGE_SIZE = 60

async function fetchAssets(
  query: string,
  offset: number,
): Promise<{ assets: MediaAsset[]; total: number }> {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    offset: String(offset),
  })
  if (query.trim()) {
    params.set("q", query.trim())
  }
  const response = await fetch(`/api/admin/media?${params.toString()}`)
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(body?.error ?? "Failed to load media")
  }
  return (await response.json()) as {
    assets: MediaAsset[]
    total: number
  }
}

export function MediaLibrary({
  initialAssets,
  initialTotal,
  blobConfigured,
  onSelect,
}: MediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets)
  const [total, setTotal] = useState(initialTotal)
  const [query, setQuery] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSearch(event: React.FormEvent): void {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        const result = await fetchAssets(query, 0)
        setAssets(result.assets)
        setTotal(result.total)
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load media",
        )
      }
    })
  }

  function handleLoadMore(): void {
    setError(null)
    startTransition(async () => {
      try {
        const result = await fetchAssets(query, assets.length)
        setAssets((prev) => [...prev, ...result.assets])
        setTotal(result.total)
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load media",
        )
      }
    })
  }

  async function handleUpload(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setUploadError(null)
    const form = event.currentTarget
    const data = new FormData(form)
    const file = data.get("file")
    if (!(file instanceof File) || file.size === 0) {
      setUploadError("Choose an image file first")
      return
    }
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: data,
      })
      const body = (await response.json().catch(() => null)) as {
        asset?: MediaAsset
        error?: string
      } | null
      if (!response.ok || !body?.asset) {
        throw new Error(body?.error ?? "Upload failed")
      }
      setAssets((prev) => [body.asset as MediaAsset, ...prev])
      setTotal((prev) => prev + 1)
      form.reset()
    } catch (requestError) {
      setUploadError(
        requestError instanceof Error ? requestError.message : "Upload failed",
      )
    }
  }

  function handleDelete(id: number): void {
    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/media/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string
          } | null
          throw new Error(body?.error ?? "Delete failed")
        }
        setAssets((prev) => prev.filter((asset) => asset.id !== id))
        setTotal((prev) => Math.max(0, prev - 1))
      } catch (requestError) {
        setError(
          requestError instanceof Error ? requestError.message : "Delete failed",
        )
      }
    })
  }

  async function handleCopy(asset: MediaAsset): Promise<void> {
    try {
      await navigator.clipboard.writeText(asset.url)
      setCopiedId(asset.id)
      window.setTimeout(() => {
        setCopiedId((current) => (current === asset.id ? null : current))
      }, 1500)
    } catch {
      setError("Copy failed")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {blobConfigured ? null : (
        <p
          role="note"
          className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
        >
          Uploads are disabled until BLOB_READ_WRITE_TOKEN is set. Existing
          rows still list below.
        </p>
      )}

      <form
        onSubmit={(event) => {
          void handleUpload(event)
        }}
        className="flex flex-wrap items-end gap-3 rounded-md border border-gray-200 p-4 dark:border-gray-800"
      >
        <div>
          <label htmlFor="media-file" className="block text-sm font-medium">
            Image
          </label>
          <input
            id="media-file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            disabled={!blobConfigured}
            className="mt-1 block text-sm"
          />
        </div>
        <div className="min-w-48 flex-1">
          <label htmlFor="media-alt" className="block text-sm font-medium">
            Alt (optional)
          </label>
          <input
            id="media-alt"
            name="alt"
            placeholder="Auto from filename"
            disabled={!blobConfigured}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <Button type="submit" disabled={!blobConfigured}>
          Upload
        </Button>
        {uploadError ? (
          <span
            role="alert"
            className="w-full text-sm text-red-600 dark:text-red-400"
          >
            {uploadError}
          </span>
        ) : null}
      </form>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search filename or alt"
          aria-label="Search media"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          Search
        </Button>
      </form>

      {error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {total} {total === 1 ? "asset" : "assets"}
        {assets.length < total ? ` · showing ${assets.length}` : ""}
      </p>

      {assets.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No media yet. Upload the first image.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.url}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                loading="lazy"
                className="aspect-[4/3] w-full bg-gray-100 object-cover dark:bg-gray-900"
              />
              <div className="flex flex-col gap-1 p-3">
                <p className="truncate text-sm font-medium" title={asset.filename}>
                  {asset.filename}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {asset.width}×{asset.height} · {asset.alt}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {onSelect ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onSelect(asset)}
                    >
                      Select
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      void handleCopy(asset)
                    }}
                  >
                    {copiedId === asset.id ? "Copied" : "Copy URL"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={isPending}
                    onClick={() => handleDelete(asset.id)}
                    aria-label={`Delete ${asset.filename}`}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {assets.length < total ? (
        <div>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleLoadMore}
          >
            {isPending ? "Loading..." : "Load more"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
