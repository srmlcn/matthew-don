"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { AdminBookReviewItem } from "@/lib/data/books/admin"
import {
  createBookReview,
  deleteBookReview,
  reorderBookReviews,
  toggleReviewVisibility,
  updateBookReview,
} from "../actions"

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
const labelClass = "block text-sm font-medium"

interface BookReviewsManagerProps {
  bookId: string
  initialReviews: AdminBookReviewItem[]
}

export function BookReviewsManager({
  bookId,
  initialReviews,
}: BookReviewsManagerProps) {
  const [reviews, setReviews] =
    useState<AdminBookReviewItem[]>(initialReviews)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // New review form state
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newReview, setNewReview] = useState("")
  const [newStars, setNewStars] = useState(5)

  // Edit review state
  const [editName, setEditName] = useState("")
  const [editDesc, setEditDesc] = useState("")
  const [editReview, setEditReview] = useState("")
  const [editStars, setEditStars] = useState(5)

  function startEditing(review: AdminBookReviewItem): void {
    setEditingId(review.id)
    setEditName(review.name)
    setEditDesc(review.description)
    setEditReview(review.review)
    setEditStars(review.stars)
  }

  function handleToggleVisibility(review: AdminBookReviewItem): void {
    setError(null)
    setSuccess(null)
    const next = !review.isVisible

    startTransition(async () => {
      const res = await toggleReviewVisibility(review.id, next)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, isVisible: next } : r)),
      )
      setSuccess(`Review by "${review.name}" is now ${next ? "visible" : "hidden"}.`)
    })
  }

  function handleMove(index: number, direction: "up" | "down"): void {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= reviews.length) return

    const currentItem = reviews[index]
    const targetItem = reviews[targetIndex]
    if (!currentItem || !targetItem) return

    const reordered = reviews.map((item, idx) => {
      if (idx === index) return { ...item, sortOrder: targetItem.sortOrder }
      if (idx === targetIndex) return { ...item, sortOrder: currentItem.sortOrder }
      return item
    })

    const payload = reordered.map((item) => ({
      id: item.id,
      sortOrder: item.sortOrder,
    }))

    startTransition(async () => {
      const res = await reorderBookReviews(bookId, payload)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setReviews(reordered)
    })
  }

  function handleDelete(review: AdminBookReviewItem): void {
    if (!confirm(`Delete review by "${review.name}"?`)) return
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const res = await deleteBookReview(review.id)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setReviews((prev) => prev.filter((r) => r.id !== review.id))
      setSuccess(`Deleted review by "${review.name}".`)
    })
  }

  function handleCreate(e: React.FormEvent): void {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const res = await createBookReview(bookId, {
        name: newName.trim(),
        description: newDesc.trim(),
        review: newReview.trim(),
        stars: newStars,
        isVisible: true,
        sortOrder: reviews.length,
      })

      if (!res.ok) {
        setError(res.error)
        return
      }

      setReviews((prev) => [
        ...prev,
        {
          id: res.id,
          bookId,
          name: newName.trim(),
          description: newDesc.trim(),
          review: newReview.trim(),
          stars: newStars,
          sortOrder: prev.length,
          isVisible: true,
        },
      ])

      setIsAdding(false)
      setNewName("")
      setNewDesc("")
      setNewReview("")
      setNewStars(5)
      setSuccess("Review added successfully.")
    })
  }

  function handleSaveEdit(e: React.FormEvent): void {
    e.preventDefault()
    if (!editingId) return
    setError(null)

    startTransition(async () => {
      const res = await updateBookReview(editingId, {
        name: editName.trim(),
        description: editDesc.trim(),
        review: editReview.trim(),
        stars: editStars,
      })

      if (!res.ok) {
        setError(res.error)
        return
      }

      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                name: editName.trim(),
                description: editDesc.trim(),
                review: editReview.trim(),
                stars: editStars,
              }
            : r,
        ),
      )
      setEditingId(null)
      setSuccess("Review updated.")
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
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}. Reorder via sort order arrows and toggle visibility for moderation.
        </p>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            Add Review
          </Button>
        )}
      </div>

      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="rounded-lg border border-gray-200 p-4 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col gap-3"
        >
          <h3 className="text-sm font-semibold">New Review</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Reviewer Name *</label>
              <input
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div>
              <label className={labelClass}>Source / Tagline *</label>
              <input
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className={inputClass}
                placeholder="e.g. Amazon Customer"
              />
            </div>
            <div>
              <label className={labelClass}>Rating (Stars) *</label>
              <select
                value={newStars}
                onChange={(e) => setNewStars(Number(e.target.value))}
                className={inputClass}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Review Text *</label>
            <textarea
              required
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className={inputClass}
              placeholder="What did they say?"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Adding..." : "Add Review"}
            </Button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews found for this book.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-3 py-2 w-16">Order</th>
                <th className="px-3 py-2">Reviewer</th>
                <th className="px-3 py-2">Rating</th>
                <th className="px-3 py-2">Review</th>
                <th className="px-3 py-2">Visibility</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {reviews.map((r, idx) => (
                <tr key={r.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={idx === 0 || isPending}
                        onClick={() => handleMove(idx, "up")}
                        aria-label="Move up"
                      >
                        ↑
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={idx === reviews.length - 1 || isPending}
                        onClick={() => handleMove(idx, "down")}
                        aria-label="Move down"
                      >
                        ↓
                      </Button>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="font-medium">{r.name}</span>
                    <span className="block text-xs text-gray-500">{r.description}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-yellow-500">{"★".repeat(r.stars)}</span>
                    <span className="text-xs text-gray-400 ml-1">({r.stars}/5)</span>
                  </td>
                  <td className="px-3 py-2 max-w-xs truncate" title={r.review}>
                    "{r.review}"
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleToggleVisibility(r)}
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold cursor-pointer ${
                        r.isVisible
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {r.isVisible ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(r)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => handleDelete(r)}
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

      {editingId && (
        <form
          onSubmit={handleSaveEdit}
          className="mt-4 rounded-lg border border-blue-200 p-4 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/20 flex flex-col gap-3"
        >
          <h3 className="text-sm font-semibold">Edit Review</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Reviewer Name *</label>
              <input
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Source / Tagline *</label>
              <input
                required
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Rating *</label>
              <select
                value={editStars}
                onChange={(e) => setEditStars(Number(e.target.value))}
                className={inputClass}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Review Text *</label>
            <textarea
              required
              rows={3}
              value={editReview}
              onChange={(e) => setEditReview(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
