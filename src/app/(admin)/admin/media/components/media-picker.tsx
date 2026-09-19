"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { MediaAsset } from "@/lib/media/assets"
import { MediaLibrary } from "./media-library"

interface MediaPickerProps {
  open: boolean
  initialAssets: MediaAsset[]
  initialTotal: number
  blobConfigured: boolean
  onSelect: (asset: MediaAsset) => void
  onClose: () => void
}

export function MediaPicker({
  open,
  initialAssets,
  initialTotal,
  blobConfigured,
  onSelect,
  onClose,
}: MediaPickerProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    function handleKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose from media library"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-md bg-white p-6 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Media library</h2>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <MediaLibrary
          initialAssets={initialAssets}
          initialTotal={initialTotal}
          blobConfigured={blobConfigured}
          onSelect={(asset) => {
            onSelect(asset)
            onClose()
          }}
        />
      </div>
    </div>
  )
}
