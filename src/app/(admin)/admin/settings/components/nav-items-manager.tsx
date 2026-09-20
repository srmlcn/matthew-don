"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { DbNavItem } from "@/lib/data/settings"
import {
  createNavItem,
  deleteNavItem,
  reorderNavItems,
  updateNavItem,
} from "../actions"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"

interface NavItemsManagerProps {
  initialItems: DbNavItem[]
}

export function NavItemsManager({ initialItems }: NavItemsManagerProps) {
  const [items, setItems] = useState<DbNavItem[]>(initialItems)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // New item form state
  const [isAdding, setIsAdding] = useState(false)
  const [label, setLabel] = useState("")
  const [href, setHref] = useState("")
  const [section, setSection] = useState("main")
  const [external, setExternal] = useState(false)
  const [description, setDescription] = useState("")

  // Edit item state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [editHref, setEditHref] = useState("")
  const [editSection, setEditSection] = useState("main")
  const [editExternal, setEditExternal] = useState(false)
  const [editDescription, setEditDescription] = useState("")

  function handleStartEdit(item: DbNavItem): void {
    setEditingId(item.id)
    setEditLabel(item.label)
    setEditHref(item.href)
    setEditSection(item.section)
    setEditExternal(item.external)
    setEditDescription(item.description ?? "")
  }

  function handleCancelEdit(): void {
    setEditingId(null)
  }

  function handleSaveEdit(id: number): void {
    setError(null)
    startTransition(async () => {
      const result = await updateNavItem(id, {
        label: editLabel,
        href: editHref,
        section: editSection,
        external: editExternal,
        description: editDescription,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                label: editLabel,
                href: editHref,
                section: editSection,
                external: editExternal,
                description: editDescription || null,
              }
            : item,
        ),
      )
      setEditingId(null)
    })
  }

  function handleCreate(e: React.FormEvent): void {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const result = await createNavItem({
        label,
        href,
        section,
        external,
        description,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      const newItem: DbNavItem = {
        id: result.id,
        label,
        href,
        section,
        order: items.filter((i) => i.section === section).length,
        external,
        description: description || null,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setItems((prev) => [...prev, newItem])
      setLabel("")
      setHref("")
      setDescription("")
      setExternal(false)
      setIsAdding(false)
    })
  }

  function handleDelete(id: number): void {
    if (!confirm("Are you sure you want to delete this navigation link?")) {
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await deleteNavItem(id)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setItems((prev) => prev.filter((item) => item.id !== id))
    })
  }

  function handleToggleVisible(item: DbNavItem): void {
    setError(null)
    const newVisible = !item.visible
    startTransition(async () => {
      const result = await updateNavItem(item.id, {
        ...item,
        visible: newVisible,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, visible: newVisible } : i)),
      )
    })
  }

  function handleMove(index: number, direction: "up" | "down"): void {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return

    const newItems = [...items]
    const current = newItems[index]
    const target = newItems[targetIndex]
    if (!current || !target) return

    const currentOrder = current.order
    current.order = target.order
    target.order = currentOrder

    newItems[index] = target
    newItems[targetIndex] = current
    setItems(newItems)

    startTransition(async () => {
      await reorderNavItems([
        { id: current.id, order: current.order },
        { id: target.id, order: target.order },
      ])
    })
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Navigation Items</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage links for the navbar and site footer.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          variant={isAdding ? "ghost" : "default"}
        >
          {isAdding ? "Cancel" : "+ Add Link"}
        </Button>
      </div>

      {error ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {/* Add new link form */}
      {isAdding ? (
        <form
          onSubmit={handleCreate}
          className="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50"
        >
          <h3 className="mb-4 font-medium">New Navigation Link</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="newLabel" className={labelClass}>
                Label *
              </label>
              <input
                id="newLabel"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Books, About, Store"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="newHref" className={labelClass}>
                Target URL (href) *
              </label>
              <input
                id="newHref"
                required
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="e.g. /about or https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="newSection" className={labelClass}>
                Section
              </label>
              <select
                id="newSection"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className={inputClass}
              >
                <option value="main">Main (Navbar Header)</option>
                <option value="footer">Footer</option>
              </select>
            </div>
            <div>
              <label htmlFor="newDescription" className={labelClass}>
                Description (optional)
              </label>
              <input
                id="newDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description for SEO"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                id="newExternal"
                type="checkbox"
                checked={external}
                onChange={(e) => setExternal(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-700"
              />
              <label htmlFor="newExternal" className="text-sm">
                Open in new tab (external)
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Link"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {/* Items List */}
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Href</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No custom navigation items yet. Navbar falls back to default links (Home, About, Contact).
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  {editingId === item.id ? (
                    <td colSpan={6} className="p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Label</label>
                          <input
                            value={editLabel}
                            onChange={(e) => setEditLabel(e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Href</label>
                          <input
                            value={editHref}
                            onChange={(e) => setEditHref(e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Section</label>
                          <select
                            value={editSection}
                            onChange={(e) => setEditSection(e.target.value)}
                            className={inputClass}
                          >
                            <option value="main">Main (Navbar Header)</option>
                            <option value="footer">Footer</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                          <input
                            id={`edit-ext-${item.id}`}
                            type="checkbox"
                            checked={editExternal}
                            onChange={(e) => setEditExternal(e.target.checked)}
                          />
                          <label htmlFor={`edit-ext-${item.id}`} className="text-sm">
                            External link
                          </label>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(item.id)}
                          disabled={isPending}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0 || isPending}
                            className="rounded p-1 hover:bg-gray-200 disabled:opacity-30 dark:hover:bg-gray-800"
                            aria-label="Move up"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(index, "down")}
                            disabled={index === items.length - 1 || isPending}
                            className="rounded p-1 hover:bg-gray-200 disabled:opacity-30 dark:hover:bg-gray-800"
                            aria-label="Move down"
                          >
                            ▼
                          </button>
                          <span className="ml-1">{item.order}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {item.label}
                        {item.external ? (
                          <span className="ml-1.5 rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            ext
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                        {item.href}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                          {item.section}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleToggleVisible(item)}
                          disabled={isPending}
                          className={`rounded px-2 py-0.5 text-xs font-medium ${
                            item.visible
                              ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {item.visible ? "Visible" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(item)}
                            disabled={isPending}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            disabled={isPending}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
