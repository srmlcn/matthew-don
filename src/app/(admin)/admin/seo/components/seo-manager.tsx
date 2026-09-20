"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { SeoOverrideItem } from "@/lib/data/seo"
import { deleteSeoOverride, upsertSeoOverride } from "../actions"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"

interface SeoManagerProps {
  initialOverrides: SeoOverrideItem[]
}

export function SeoManager({ initialOverrides }: SeoManagerProps) {
  const [overrides, setOverrides] =
    useState<SeoOverrideItem[]>(initialOverrides)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form fields
  const [entityType, setEntityType] = useState("book")
  const [entityId, setEntityId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [ogImage, setOgImage] = useState("")
  const [canonical, setCanonical] = useState("")
  const [noindex, setNoindex] = useState(false)

  function resetForm() {
    setIsAdding(false)
    setEditingId(null)
    setEntityType("book")
    setEntityId("")
    setTitle("")
    setDescription("")
    setOgImage("")
    setCanonical("")
    setNoindex(false)
  }

  function startEdit(item: SeoOverrideItem) {
    setIsAdding(false)
    setEditingId(item.id)
    setEntityType(item.entityType)
    setEntityId(item.entityId)
    setTitle(item.title ?? "")
    setDescription(item.description ?? "")
    setOgImage(item.ogImage ?? "")
    setCanonical(item.canonical ?? "")
    setNoindex(item.noindex)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const payload = {
      entityType,
      entityId: entityId.trim(),
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      ogImage: ogImage.trim() || undefined,
      canonical: canonical.trim() || undefined,
      noindex,
    }

    startTransition(async () => {
      const res = await upsertSeoOverride(payload)
      if (!res.ok) {
        setError(res.error)
        return
      }

      setOverrides((prev) => {
        const existingIdx = prev.findIndex(
          (o) => o.entityType === entityType && o.entityId === entityId.trim(),
        )
        const updatedItem: SeoOverrideItem = {
          id: editingId ?? Date.now(),
          entityType,
          entityId: entityId.trim(),
          title: title.trim() || null,
          description: description.trim() || null,
          ogImage: ogImage.trim() || null,
          canonical: canonical.trim() || null,
          noindex,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        if (existingIdx >= 0) {
          const next = [...prev]
          next[existingIdx] = updatedItem
          return next
        }
        return [...prev, updatedItem]
      })

      resetForm()
      setSuccess("SEO override saved.")
    })
  }

  function handleDelete(item: SeoOverrideItem) {
    if (!confirm(`Delete SEO override for ${item.entityType}:${item.entityId}?`)) return
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const res = await deleteSeoOverride(item.id)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setOverrides((prev) => prev.filter((o) => o.id !== item.id))
      setSuccess("Deleted SEO override.")
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
          {success}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Override meta titles, descriptions, social images, canonical tags, and search engine indexing.
        </p>
        {!isAdding && !editingId && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            Add Override
          </Button>
        )}
      </div>

      {(isAdding || editingId !== null) && (
        <form
          onSubmit={handleSave}
          className="rounded-lg border border-gray-200 p-4 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col gap-3"
        >
          <h3 className="text-sm font-semibold">
            {editingId ? "Edit SEO Override" : "New SEO Override"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Entity Type *</label>
              <select
                value={entityType}
                disabled={editingId !== null}
                onChange={(e) => setEntityType(e.target.value)}
                className={inputClass}
              >
                <option value="book">Book</option>
                <option value="page">Page</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Entity ID / Slug *</label>
              <input
                required
                value={entityId}
                disabled={editingId !== null}
                onChange={(e) => setEntityId(e.target.value)}
                className={inputClass}
                placeholder="e.g. the-moon-queen or home"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Meta Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Custom page title"
            />
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              placeholder="Custom meta description"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>OpenGraph Image URL</label>
              <input
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className={inputClass}
                placeholder="/covers/custom-share.jpg"
              />
            </div>
            <div>
              <label className={labelClass}>Canonical URL</label>
              <input
                value={canonical}
                onChange={(e) => setCanonical(e.target.value)}
                className={inputClass}
                placeholder="https://matthewdon.com/custom"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="noindex"
              checked={noindex}
              onChange={(e) => setNoindex(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="noindex" className="text-sm font-medium">
              Noindex (hide from search engine search results)
            </label>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : "Save Override"}
            </Button>
          </div>
        </form>
      )}

      {overrides.length === 0 ? (
        <p className="text-sm text-gray-500">No SEO overrides defined yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-3 py-2">Entity</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Robots</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {overrides.map((o) => (
                <tr key={o.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="font-semibold uppercase text-xs text-blue-600 dark:text-blue-400 mr-2">
                      {o.entityType}
                    </span>
                    <span className="font-medium">{o.entityId}</span>
                  </td>
                  <td className="px-3 py-2 max-w-xs truncate" title={o.title ?? "Default"}>
                    {o.title ?? <span className="text-gray-400 italic">Default</span>}
                  </td>
                  <td className="px-3 py-2 max-w-xs truncate" title={o.description ?? "Default"}>
                    {o.description ?? <span className="text-gray-400 italic">Default</span>}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {o.noindex ? (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        noindex
                      </span>
                    ) : (
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        index
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(o)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDelete(o)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
