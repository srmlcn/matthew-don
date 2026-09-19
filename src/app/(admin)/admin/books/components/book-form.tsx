"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button"
import { generateSlug } from "@/lib/utils/slug"
import type { MediaAsset } from "@/lib/media/assets"
import { MediaPicker } from "../../media/components/media-picker"
import { createBook, updateBook } from "../actions"

export interface BookFormValues {
  slug: string
  title: string
  subtitle: string
  status: "published" | "preorder" | "upcoming"
  category: "adventures" | "comedy" | "comics"
  releaseDate: string
  featured: boolean
  order: string
  shortDescription: string
  longDescription: string
  contentWarnings: string
  availability: string
  isbn: string
  pageCount: string
  seriesName: string
  seriesBook: string
  seriesTotal: string
  navSection: string
  coverSrc: string
  coverAlt: string
  coverWidth: string
  coverHeight: string
}

const defaultValues: BookFormValues = {
  slug: "",
  title: "",
  subtitle: "",
  status: "published",
  category: "adventures",
  releaseDate: "",
  featured: false,
  order: "",
  shortDescription: "",
  longDescription: "",
  contentWarnings: "",
  availability: "",
  isbn: "",
  pageCount: "",
  seriesName: "",
  seriesBook: "",
  seriesTotal: "",
  navSection: "",
  coverSrc: "",
  coverAlt: "",
  coverWidth: "1200",
  coverHeight: "1800",
}

interface BookFormProps {
  mode: "create" | "edit"
  bookId?: string
  initial?: BookFormValues
}

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"
const errorClass = "mt-1 text-xs text-red-600 dark:text-red-400"

export function BookForm({ mode, bookId, initial }: BookFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [values, setValues] = useState<BookFormValues>(initial ?? defaultValues)
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerAssets, setPickerAssets] = useState<MediaAsset[]>([])
  const [pickerTotal, setPickerTotal] = useState(0)

  function setField<K extends keyof BookFormValues>(
    field: K,
    value: BookFormValues[K],
  ): void {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function fieldError(field: string): string | null {
    const messages = fieldErrors[field]
    return messages ? messages.join(" ") : null
  }

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

  function handlePickerSelect(asset: MediaAsset): void {
    setValues((prev) => ({
      ...prev,
      coverSrc: asset.url,
      coverAlt: asset.alt,
      coverWidth: String(asset.width),
      coverHeight: String(asset.height),
    }))
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})

    const payload = {
      slug: values.slug,
      title: values.title,
      subtitle: values.subtitle,
      status: values.status,
      category: values.category,
      releaseDate: values.releaseDate,
      featured: values.featured,
      order: values.order,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      contentWarnings: values.contentWarnings,
      availability: values.availability,
      isbn: values.isbn,
      pageCount: values.pageCount,
      seriesName: values.seriesName,
      seriesBook: values.seriesBook,
      seriesTotal: values.seriesTotal,
      navSection: values.navSection,
      coverSrc: values.coverSrc,
      coverAlt: values.coverAlt,
      coverWidth: values.coverWidth,
      coverHeight: values.coverHeight,
    }

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createBook(payload)
          : await updateBook(bookId ?? "", payload)
      if (!result.ok) {
        setFormError(result.error)
        setFieldErrors(result.fieldErrors ?? {})
        return
      }
      router.push("/admin/books")
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {formError ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title *
          </label>
          <input
            id="title"
            required
            value={values.title}
            onChange={(event) => {
              const nextTitle = event.target.value
              setField("title", nextTitle)
              if (!slugTouched) {
                setField("slug", generateSlug(nextTitle))
              }
            }}
            className={inputClass}
          />
          {fieldError("title") ? (
            <p className={errorClass}>{fieldError("title")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug *
          </label>
          <input
            id="slug"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers, hyphens"
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true)
              setField("slug", event.target.value)
            }}
            className={inputClass}
          />
          {fieldError("slug") ? (
            <p className={errorClass}>{fieldError("slug")}</p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="subtitle" className={labelClass}>
            Subtitle
          </label>
          <input
            id="subtitle"
            value={values.subtitle}
            onChange={(event) => setField("subtitle", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Status *
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(event) =>
              setField(
                "status",
                event.target.value as BookFormValues["status"],
              )
            }
            className={inputClass}
          >
            <option value="published">Published</option>
            <option value="preorder">Preorder</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Category *
          </label>
          <select
            id="category"
            value={values.category}
            onChange={(event) =>
              setField(
                "category",
                event.target.value as BookFormValues["category"],
              )
            }
            className={inputClass}
          >
            <option value="adventures">Adventures</option>
            <option value="comedy">Comedy</option>
            <option value="comics">Comics</option>
          </select>
        </div>
        <div>
          <label htmlFor="releaseDate" className={labelClass}>
            Release date
          </label>
          <input
            id="releaseDate"
            type="date"
            value={values.releaseDate}
            onChange={(event) => setField("releaseDate", event.target.value)}
            className={inputClass}
          />
          {fieldError("releaseDate") ? (
            <p className={errorClass}>{fieldError("releaseDate")}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="order" className={labelClass}>
            Order
          </label>
          <input
            id="order"
            type="number"
            min={0}
            placeholder="Auto"
            value={values.order}
            onChange={(event) => setField("order", event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            id="featured"
            type="checkbox"
            checked={values.featured}
            onChange={(event) => setField("featured", event.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured (only one book stays featured)
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="shortDescription" className={labelClass}>
            Short description *
          </label>
          <input
            id="shortDescription"
            required
            value={values.shortDescription}
            onChange={(event) =>
              setField("shortDescription", event.target.value)
            }
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="longDescription" className={labelClass}>
            Long description * (blank line between paragraphs)
          </label>
          <textarea
            id="longDescription"
            required
            rows={5}
            value={values.longDescription}
            onChange={(event) =>
              setField("longDescription", event.target.value)
            }
            className={inputClass}
          />
          {fieldError("longDescription") ? (
            <p className={errorClass}>{fieldError("longDescription")}</p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contentWarnings" className={labelClass}>
            Content warnings (one per line)
          </label>
          <textarea
            id="contentWarnings"
            rows={2}
            value={values.contentWarnings}
            onChange={(event) =>
              setField("contentWarnings", event.target.value)
            }
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="availability" className={labelClass}>
            Availability *
          </label>
          <input
            id="availability"
            required
            value={values.availability}
            onChange={(event) => setField("availability", event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="isbn" className={labelClass}>
            ISBN
          </label>
          <input
            id="isbn"
            value={values.isbn}
            onChange={(event) => setField("isbn", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pageCount" className={labelClass}>
            Page count
          </label>
          <input
            id="pageCount"
            type="number"
            min={1}
            value={values.pageCount}
            onChange={(event) => setField("pageCount", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="seriesName" className={labelClass}>
            Series name
          </label>
          <input
            id="seriesName"
            value={values.seriesName}
            onChange={(event) => setField("seriesName", event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="seriesBook" className={labelClass}>
              Book #
            </label>
            <input
              id="seriesBook"
              type="number"
              min={1}
              value={values.seriesBook}
              onChange={(event) => setField("seriesBook", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="seriesTotal" className={labelClass}>
              Of #
            </label>
            <input
              id="seriesTotal"
              type="number"
              min={1}
              value={values.seriesTotal}
              onChange={(event) => setField("seriesTotal", event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="navSection" className={labelClass}>
            Nav section override
          </label>
          <input
            id="navSection"
            placeholder="e.g. The Adventures of Luca and Kai, Mature Readers"
            value={values.navSection}
            onChange={(event) => setField("navSection", event.target.value)}
            className={inputClass}
          />
          {fieldError("navSection") ? (
            <p className={errorClass}>{fieldError("navSection")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h2 className="font-semibold">Cover</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse the media library or paste a path or URL.
          </p>
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                void handleOpenPicker()
              }}
            >
              Browse library
            </Button>
          </div>
          <MediaPicker
            open={pickerOpen}
            initialAssets={pickerAssets}
            initialTotal={pickerTotal}
            blobConfigured
            onSelect={handlePickerSelect}
            onClose={() => setPickerOpen(false)}
          />
        </div>
        <div>
          <label htmlFor="coverSrc" className={labelClass}>
            Cover src *
          </label>
          <input
            id="coverSrc"
            required
            placeholder="/adventures/book1-cover.jpg"
            value={values.coverSrc}
            onChange={(event) => setField("coverSrc", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="coverAlt" className={labelClass}>
            Cover alt *
          </label>
          <input
            id="coverAlt"
            required
            value={values.coverAlt}
            onChange={(event) => setField("coverAlt", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="coverWidth" className={labelClass}>
            Width
          </label>
          <input
            id="coverWidth"
            type="number"
            min={1}
            value={values.coverWidth}
            onChange={(event) => setField("coverWidth", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="coverHeight" className={labelClass}>
            Height
          </label>
          <input
            id="coverHeight"
            type="number"
            min={1}
            value={values.coverHeight}
            onChange={(event) => setField("coverHeight", event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving..."
            : mode === "create"
              ? "Create book"
              : "Save changes"}
        </Button>
        <LinkButton href="/admin/books" variant="outline">
          Cancel
        </LinkButton>
      </div>
    </form>
  )
}
