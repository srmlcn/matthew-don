"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { MediaAsset } from "@/lib/media/assets"
import type { SiteSettings } from "@/lib/data/settings"
import { MediaPicker } from "../../media/components/media-picker"
import { updateSiteSettings } from "../actions"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"
const errorClass = "mt-1 text-xs text-red-600 dark:text-red-400"
const hintClass = "mt-1 text-xs text-gray-500 dark:text-gray-400"

interface SettingsFormProps {
  initialSettings: SiteSettings
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const [name, setName] = useState(initialSettings.name)
  const [tagline, setTagline] = useState(initialSettings.tagline)
  const [canonicalUrl, setCanonicalUrl] = useState(initialSettings.canonicalUrl)
  const [ogImage, setOgImage] = useState(initialSettings.ogImage)
  const [footer, setFooter] = useState(initialSettings.footer)

  const [instagramUrl, setInstagramUrl] = useState(
    initialSettings.socials?.instagram?.url ?? "",
  )
  const [instagramHandle, setInstagramHandle] = useState(
    initialSettings.socials?.instagram?.handle ?? "",
  )
  const [tiktokUrl, setTiktokUrl] = useState(
    initialSettings.socials?.tiktok?.url ?? "",
  )
  const [tiktokHandle, setTiktokHandle] = useState(
    initialSettings.socials?.tiktok?.handle ?? "",
  )
  const [amazonUrl, setAmazonUrl] = useState(
    initialSettings.socials?.amazon?.url ?? "",
  )
  const [amazonLabel, setAmazonLabel] = useState(
    initialSettings.socials?.amazon?.label ?? "",
  )
  const [goodreadsUrl, setGoodreadsUrl] = useState(
    initialSettings.socials?.goodreads?.url ?? "",
  )
  const [goodreadsLabel, setGoodreadsLabel] = useState(
    initialSettings.socials?.goodreads?.label ?? "",
  )

  const [contactEmail, setContactEmail] = useState(
    initialSettings.contact?.email ?? "",
  )
  const [contactMessage, setContactMessage] = useState(
    initialSettings.contact?.message ?? "",
  )

  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerAssets, setPickerAssets] = useState<MediaAsset[]>([])
  const [pickerTotal, setPickerTotal] = useState(0)

  async function handleOpenPicker(): Promise<void> {
    try {
      const response = await fetch("/api/admin/media?limit=60")
      const body = (await response.json().catch(() => null)) as {
        assets?: MediaAsset[]
        total?: number
      } | null
      if (response.ok && body) {
        setPickerAssets(body.assets ?? [])
        setPickerTotal(body.total ?? 0)
      }
    } catch {
      setPickerAssets([])
      setPickerTotal(0)
    }
    setPickerOpen(true)
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    setSuccess(false)
    setFormError(null)
    setFieldErrors({})

    const payload = {
      name,
      tagline,
      canonicalUrl,
      ogImage,
      footer,
      socials: {
        instagram: { url: instagramUrl, handle: instagramHandle },
        tiktok: { url: tiktokUrl, handle: tiktokHandle },
        amazon: { url: amazonUrl, label: amazonLabel },
        goodreads: { url: goodreadsUrl, label: goodreadsLabel },
      },
      contact: {
        email: contactEmail,
        message: contactMessage,
        preferredMethods: ["instagram", "tiktok"],
      },
    }

    startTransition(async () => {
      const result = await updateSiteSettings(payload)
      if (!result.ok) {
        setFormError(result.error)
        setFieldErrors(result.fieldErrors ?? {})
        return
      }
      setSuccess(true)
    })
  }

  function fieldError(field: string): string | null {
    const messages = fieldErrors[field]
    return messages ? messages.join(" ") : null
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-8">
      {success ? (
        <div className="rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300">
          Site settings saved successfully. Cache tags revalidated.
        </div>
      ) : null}

      {formError ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {formError}
        </div>
      ) : null}

      {/* General Settings */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">General</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={labelClass}>
              Site Name *
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            {fieldError("name") ? (
              <p className={errorClass}>{fieldError("name")}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="tagline" className={labelClass}>
              Tagline / Meta Description *
            </label>
            <textarea
              id="tagline"
              required
              rows={2}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={inputClass}
            />
            {fieldError("tagline") ? (
              <p className={errorClass}>{fieldError("tagline")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="canonicalUrl" className={labelClass}>
              Canonical URL *
            </label>
            <input
              id="canonicalUrl"
              type="url"
              required
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className={inputClass}
            />
            <p className={hintClass}>Replaces hardcoded domain across metadata and canonical tags</p>
            {fieldError("canonicalUrl") ? (
              <p className={errorClass}>{fieldError("canonicalUrl")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="footer" className={labelClass}>
              Footer Copyright Text *
            </label>
            <input
              id="footer"
              required
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
              className={inputClass}
            />
            <p className={hintClass}>Use {"{year}"} for dynamic current year</p>
            {fieldError("footer") ? (
              <p className={errorClass}>{fieldError("footer")}</p>
            ) : null}
          </div>
        </div>
      </section>

      {/* SEO / OG Image */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Default OG Image</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              id="ogImage"
              required
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className={inputClass}
              placeholder="e.g. /matthew-don.jpg or Blob URL"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleOpenPicker}
              className="mt-1 shrink-0"
            >
              Choose from library
            </Button>
          </div>
          {fieldError("ogImage") ? (
            <p className={errorClass}>{fieldError("ogImage")}</p>
          ) : null}
        </div>
      </section>

      {/* Socials */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Social Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="instagramUrl" className={labelClass}>
              Instagram URL
            </label>
            <input
              id="instagramUrl"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="instagramHandle" className={labelClass}>
              Instagram Handle
            </label>
            <input
              id="instagramHandle"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="tiktokUrl" className={labelClass}>
              TikTok URL
            </label>
            <input
              id="tiktokUrl"
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="tiktokHandle" className={labelClass}>
              TikTok Handle
            </label>
            <input
              id="tiktokHandle"
              value={tiktokHandle}
              onChange={(e) => setTiktokHandle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="amazonUrl" className={labelClass}>
              Amazon Author URL
            </label>
            <input
              id="amazonUrl"
              value={amazonUrl}
              onChange={(e) => setAmazonUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="amazonLabel" className={labelClass}>
              Amazon Button Label
            </label>
            <input
              id="amazonLabel"
              value={amazonLabel}
              onChange={(e) => setAmazonLabel(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="goodreadsUrl" className={labelClass}>
              Goodreads URL
            </label>
            <input
              id="goodreadsUrl"
              value={goodreadsUrl}
              onChange={(e) => setGoodreadsUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="goodreadsLabel" className={labelClass}>
              Goodreads Button Label
            </label>
            <input
              id="goodreadsLabel"
              value={goodreadsLabel}
              onChange={(e) => setGoodreadsLabel(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Contact Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="contactEmail" className={labelClass}>
              Contact Email
            </label>
            <input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contactMessage" className={labelClass}>
              Contact Message / Blurb
            </label>
            <textarea
              id="contactMessage"
              rows={2}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <MediaPicker
        open={pickerOpen}
        initialAssets={pickerAssets}
        initialTotal={pickerTotal}
        blobConfigured={true}
        onSelect={(asset) => setOgImage(asset.url)}
        onClose={() => setPickerOpen(false)}
      />
    </form>
  )
}
