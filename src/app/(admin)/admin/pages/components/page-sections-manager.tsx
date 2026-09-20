"use client"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { PageSectionContent, PageSectionRecord } from "@/lib/data/pages"
import {
  createPageSection,
  deletePageSection,
  reorderPageSections,
  toggleSectionVisibility,
} from "../actions"
import { SectionEditor } from "./section-editor"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"

interface PageSectionsManagerProps {
  initialSections: PageSectionRecord[]
}

export function PageSectionsManager({
  initialSections,
}: PageSectionsManagerProps) {
  const searchParams = useSearchParams()
  const filterPage = searchParams.get("page")

  const [sections, setSections] =
    useState<PageSectionRecord[]>(initialSections)
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)
  const [successBanner, setSuccessBanner] = useState<string | null>(null)

  // New section form state
  const [isAdding, setIsAdding] = useState(false)
  const [newPage, setNewPage] = useState(
    filterPage && filterPage !== "all" ? filterPage : "home",
  )
  const [newSectionKey, setNewSectionKey] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newParagraph, setNewParagraph] = useState("")

  const displayedSections = sections
    .filter((s) => !filterPage || filterPage === "all" || s.page === filterPage)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  function handleToggleVisibility(section: PageSectionRecord): void {
    setActionError(null)
    setSuccessBanner(null)
    const nextVisibility = !section.isVisible

    startTransition(async () => {
      const result = await toggleSectionVisibility(section.id, nextVisibility)
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      setSections((prev) =>
        prev.map((s) =>
          s.id === section.id ? { ...s, isVisible: nextVisibility } : s,
        ),
      )
      setSuccessBanner(
        `Section "${section.sectionKey}" is now ${nextVisibility ? "visible" : "hidden"}.`,
      )
    })
  }

  function handleMove(index: number, direction: "up" | "down"): void {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= displayedSections.length) return

    const currentItem = displayedSections[index]
    const targetItem = displayedSections[targetIndex]
    if (!currentItem || !targetItem) return

    const reordered = displayedSections.map((item, idx) => {
      if (idx === index) return { ...item, sortOrder: targetItem.sortOrder }
      if (idx === targetIndex) return { ...item, sortOrder: currentItem.sortOrder }
      return item
    })

    const payload = reordered.map((item) => ({
      id: item.id,
      sortOrder: item.sortOrder,
    }))

    startTransition(async () => {
      const result = await reorderPageSections(payload)
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      setSections((prev) =>
        prev.map((s) => {
          const match = reordered.find((r) => r.id === s.id)
          return match ? { ...s, sortOrder: match.sortOrder } : s
        }),
      )
    })
  }

  function handleDelete(section: PageSectionRecord): void {
    if (
      !confirm(
        `Are you sure you want to delete section "${section.sectionKey}" on page "${section.page}"?`,
      )
    ) {
      return
    }

    setActionError(null)
    setSuccessBanner(null)

    startTransition(async () => {
      const result = await deletePageSection(section.id)
      if (!result.ok) {
        setActionError(result.error)
        return
      }
      setSections((prev) => prev.filter((s) => s.id !== section.id))
      setSuccessBanner(`Deleted section "${section.sectionKey}".`)
    })
  }

  function handleCreateSection(e: React.FormEvent): void {
    e.preventDefault()
    setActionError(null)

    if (!newSectionKey.trim()) {
      setActionError("Section key is required")
      return
    }

    const content: PageSectionContent = {
      title: newTitle.trim() || undefined,
      paragraphs: newParagraph.trim() ? [newParagraph.trim()] : [],
    }

    startTransition(async () => {
      const result = await createPageSection({
        page: newPage.trim(),
        sectionKey: newSectionKey.trim().toLowerCase(),
        isVisible: true,
        content,
      })

      if (!result.ok) {
        setActionError(result.error)
        return
      }

      const newId = result.id
      setSections((prev) => [
        ...prev,
        {
          id: newId,
          page: newPage.trim(),
          sectionKey: newSectionKey.trim().toLowerCase(),
          content,
          sortOrder: prev.length,
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])

      setIsAdding(false)
      setNewSectionKey("")
      setNewTitle("")
      setNewParagraph("")
      setSuccessBanner(`Created section "${newSectionKey}".`)
    })
  }

  return (
    <div className="space-y-6">
      {successBanner && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">
          {successBanner}
        </div>
      )}

      {actionError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
          {actionError}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {filterPage && filterPage !== "all"
              ? `${filterPage.toUpperCase()} Sections`
              : "All Page Sections"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure copy, CTAs, and visibility for each section.
          </p>
        </div>
        {!isAdding && (
          <Button
            type="button"
            onClick={() => {
              setNewPage(filterPage && filterPage !== "all" ? filterPage : "home")
              setIsAdding(true)
            }}
          >
            + Add Section
          </Button>
        )}
      </div>

      {isAdding && (
        <form
          onSubmit={handleCreateSection}
          className="space-y-4 rounded-lg border border-blue-200 bg-blue-50/30 p-6 dark:border-blue-900 dark:bg-blue-950/20"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300">
              New Page Section
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Target Page</label>
              <select
                value={newPage}
                onChange={(e) => setNewPage(e.target.value)}
                className={inputClass}
              >
                <option value="home">Home</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Section Key</label>
              <input
                type="text"
                value={newSectionKey}
                onChange={(e) => setNewSectionKey(e.target.value)}
                placeholder="e.g. hero, bio, intro"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Initial Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Welcome"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>First Paragraph (Plain Text)</label>
            <textarea
              rows={2}
              value={newParagraph}
              onChange={(e) => setNewParagraph(e.target.value)}
              placeholder="Section body text..."
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Section"}
            </Button>
          </div>
        </form>
      )}

      {displayedSections.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-800">
          No sections configured.
        </p>
      ) : (
        <div className="space-y-4">
          {displayedSections.map((section, index) => {
            const isEditing = editingSectionId === section.id
            const content = (section.content ?? {}) as PageSectionContent
            const title = content.title || section.sectionKey
            const firstParagraph = content.paragraphs?.[0]

            if (isEditing) {
              return (
                <SectionEditor
                  key={section.id}
                  section={section}
                  onSave={(saved) => {
                    setSections((prev) =>
                      prev.map((s) => (s.id === saved.id ? saved : s)),
                    )
                    setEditingSectionId(null)
                    setSuccessBanner(
                      `Section "${saved.sectionKey}" updated successfully.`,
                    )
                  }}
                  onCancel={() => setEditingSectionId(null)}
                />
              )
            }

            return (
              <div
                key={section.id}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-950 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {section.page}
                    </span>
                    <h3 className="font-semibold">{title}</h3>
                    <code className="text-xs text-gray-400">
                      key: {section.sectionKey}
                    </code>
                  </div>
                  {firstParagraph && (
                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {firstParagraph}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Order: <strong>{section.sortOrder}</strong>
                    </span>
                    <span>
                      Status:{" "}
                      <span
                        className={
                          section.isVisible
                            ? "font-medium text-green-600 dark:text-green-400"
                            : "font-medium text-gray-400"
                        }
                      >
                        {section.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </span>
                    {content.paragraphs && (
                      <span>
                        Paragraphs:{" "}
                        <strong>{content.paragraphs.length}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0 || isPending}
                    title="Move up"
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMove(index, "down")}
                    disabled={
                      index === displayedSections.length - 1 || isPending
                    }
                    title="Move down"
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleVisibility(section)}
                    disabled={isPending}
                  >
                    {section.isVisible ? "Hide" : "Show"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSectionId(section.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(section)}
                    disabled={isPending}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
