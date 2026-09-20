"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { PageSectionContent, PageSectionRecord } from "@/lib/data/pages"
import type { MediaAsset } from "@/lib/media/assets"
import { MediaPicker } from "../../media/components/media-picker"
import { updatePageSection } from "../actions"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"
const hintClass = "mt-1 text-xs text-gray-500 dark:text-gray-400"
const errorClass = "mt-1 text-xs text-red-600 dark:text-red-400"

interface SectionEditorProps {
  section: PageSectionRecord
  onSave: (saved: PageSectionRecord) => void
  onCancel: () => void
}

export function SectionEditor({
  section,
  onSave,
  onCancel,
}: SectionEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const content = (section.content ?? {}) as PageSectionContent

  const [isVisible, setIsVisible] = useState(section.isVisible)
  const [sortOrder, setSortOrder] = useState(section.sortOrder)
  const [title, setTitle] = useState(content.title ?? "")
  const [subtitle, setSubtitle] = useState(content.subtitle ?? "")
  const [paragraphs, setParagraphs] = useState<string[]>(
    content.paragraphs ? [...content.paragraphs] : [],
  )

  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(
    content.primaryCta?.label ?? "",
  )
  const [primaryCtaHref, setPrimaryCtaHref] = useState(
    content.primaryCta?.href ?? "",
  )
  const [primaryCtaVariant, setPrimaryCtaVariant] = useState<
    "default" | "outline" | "ghost"
  >((content.primaryCta?.variant as "default" | "outline" | "ghost") ?? "default")

  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(
    content.secondaryCta?.label ?? "",
  )
  const [secondaryCtaHref, setSecondaryCtaHref] = useState(
    content.secondaryCta?.href ?? "",
  )
  const [secondaryCtaVariant, setSecondaryCtaVariant] = useState<
    "default" | "outline" | "ghost"
  >((content.secondaryCta?.variant as "default" | "outline" | "ghost") ?? "outline")

  const [imageSrc, setImageSrc] = useState(content.image?.src ?? "")
  const [imageAlt, setImageAlt] = useState(content.image?.alt ?? "")

  const [connectHeading, setConnectHeading] = useState(
    content.connectHeading ?? "",
  )
  const [footnote, setFootnote] = useState(content.footnote ?? "")
  const [placeholder, setPlaceholder] = useState(content.placeholder ?? "")
  const [successMessage, setSuccessMessage] = useState(
    content.successMessage ?? "",
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

  function handleParagraphChange(index: number, value: string): void {
    setParagraphs((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleAddParagraph(): void {
    setParagraphs((prev) => [...prev, ""])
  }

  function handleRemoveParagraph(index: number): void {
    setParagraphs((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault()
    setFormError(null)
    setFieldErrors({})

    const cleanedParagraphs = paragraphs
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    const updatedContent: PageSectionContent = {
      paragraphs: cleanedParagraphs,
    }

    if (title.trim()) updatedContent.title = title.trim()
    if (subtitle.trim()) updatedContent.subtitle = subtitle.trim()

    if (primaryCtaLabel.trim() && primaryCtaHref.trim()) {
      updatedContent.primaryCta = {
        label: primaryCtaLabel.trim(),
        href: primaryCtaHref.trim(),
        variant: primaryCtaVariant,
      }
    }

    if (secondaryCtaLabel.trim() && secondaryCtaHref.trim()) {
      updatedContent.secondaryCta = {
        label: secondaryCtaLabel.trim(),
        href: secondaryCtaHref.trim(),
        variant: secondaryCtaVariant,
      }
    }

    if (imageSrc.trim()) {
      updatedContent.image = {
        src: imageSrc.trim(),
        alt: imageAlt.trim() || title.trim() || "Section image",
      }
    }

    if (connectHeading.trim()) updatedContent.connectHeading = connectHeading.trim()
    if (footnote.trim()) updatedContent.footnote = footnote.trim()
    if (placeholder.trim()) updatedContent.placeholder = placeholder.trim()
    if (successMessage.trim()) updatedContent.successMessage = successMessage.trim()

    const payload = {
      page: section.page,
      sectionKey: section.sectionKey,
      sortOrder,
      isVisible,
      content: updatedContent,
    }

    startTransition(async () => {
      const result = await updatePageSection(section.id, payload)
      if (!result.ok) {
        setFormError(result.error)
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
        return
      }

      onSave({
        ...section,
        sortOrder,
        isVisible,
        content: updatedContent,
        updatedAt: new Date(),
      })
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {section.page}: {section.sectionKey}
          </h3>
          <p className={hintClass}>
            Edit copy and structured section contents.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Visible
          </label>
        </div>
      </div>

      {formError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
          {formError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Section Title / Heading</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Welcome or About Me"
            className={inputClass}
          />
          {fieldErrors["content.title"] && (
            <p className={errorClass}>{fieldErrors["content.title"][0]}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            min={0}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Subtitle / Tagline</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="e.g. Author of Adventure Fantasy..."
          className={inputClass}
        />
      </div>

      {/* Structured Paragraphs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className={labelClass}>Body Paragraphs</label>
            <p className={hintClass}>
              Structured paragraphs only (plain text, no HTML). Each entry is
              rendered as a clean paragraph.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddParagraph}
          >
            + Add Paragraph
          </Button>
        </div>

        {paragraphs.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 dark:border-gray-700">
            No paragraphs. Click &quot;+ Add Paragraph&quot; to add one.
          </p>
        ) : (
          <div className="space-y-3">
            {paragraphs.map((p, index) => (
              <div key={index} className="flex gap-2 items-start">
                <span className="mt-2 text-xs font-semibold text-gray-400">
                  #{index + 1}
                </span>
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  placeholder={`Paragraph ${index + 1} content...`}
                  className={inputClass}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveParagraph(index)}
                  className="mt-1 text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Primary CTA */}
      <div className="rounded-md border border-gray-200 p-4 dark:border-gray-800">
        <h4 className="text-sm font-semibold mb-2">Primary Call to Action</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="text-xs text-gray-500">Button Label</label>
            <input
              type="text"
              value={primaryCtaLabel}
              onChange={(e) => setPrimaryCtaLabel(e.target.value)}
              placeholder="e.g. View My Books"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Button Link (Href)</label>
            <input
              type="text"
              value={primaryCtaHref}
              onChange={(e) => setPrimaryCtaHref(e.target.value)}
              placeholder="e.g. #books or /about"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Variant</label>
            <select
              value={primaryCtaVariant}
              onChange={(e) =>
                setPrimaryCtaVariant(
                  e.target.value as "default" | "outline" | "ghost",
                )
              }
              className={inputClass}
            >
              <option value="default">Default</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Secondary CTA (optional) */}
      <div className="rounded-md border border-gray-200 p-4 dark:border-gray-800">
        <h4 className="text-sm font-semibold mb-2">Secondary Call to Action</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="text-xs text-gray-500">Button Label</label>
            <input
              type="text"
              value={secondaryCtaLabel}
              onChange={(e) => setSecondaryCtaLabel(e.target.value)}
              placeholder="e.g. About Me"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Button Link (Href)</label>
            <input
              type="text"
              value={secondaryCtaHref}
              onChange={(e) => setSecondaryCtaHref(e.target.value)}
              placeholder="e.g. /about"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Variant</label>
            <select
              value={secondaryCtaVariant}
              onChange={(e) =>
                setSecondaryCtaVariant(
                  e.target.value as "default" | "outline" | "ghost",
                )
              }
              className={inputClass}
            >
              <option value="outline">Outline</option>
              <option value="default">Default</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Image Settings */}
      <div className="rounded-md border border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold">Section Image</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenPicker}
          >
            Choose from Media Library
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs text-gray-500">Image URL / Path</label>
            <input
              type="text"
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              placeholder="/matthew-don.jpg or blob URL"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Image Alt Text</label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Descriptive alt text"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Optional contextual fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Connect / Socials Heading</label>
          <input
            type="text"
            value={connectHeading}
            onChange={(e) => setConnectHeading(e.target.value)}
            placeholder="e.g. Connect with me:"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Input Placeholder</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="e.g. your.email@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Footnote / Privacy Notice</label>
          <input
            type="text"
            value={footnote}
            onChange={(e) => setFootnote(e.target.value)}
            placeholder="e.g. We respect your privacy..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Success Message</label>
          <input
            type="text"
            value={successMessage}
            onChange={(e) => setSuccessMessage(e.target.value)}
            placeholder="e.g. Thanks for subscribing!"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Section"}
        </Button>
      </div>

      <MediaPicker
        open={pickerOpen}
        initialAssets={pickerAssets}
        initialTotal={pickerTotal}
        blobConfigured={true}
        onSelect={(asset) => {
          setImageSrc(asset.url)
          setImageAlt(asset.alt || title || asset.filename)
          setPickerOpen(false)
        }}
        onClose={() => setPickerOpen(false)}
      />
    </form>
  )
}
