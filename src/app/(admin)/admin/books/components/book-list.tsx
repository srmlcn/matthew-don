"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button"
import type { AdminBookListItem } from "@/lib/data/books/admin"
import { reorderBooks } from "../actions"
import { DeleteBookButton } from "./delete-book-button"

interface BookListProps {
  books: AdminBookListItem[]
}

function statusBadge(status: AdminBookListItem["status"]): string {
  if (status === "published") {
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  }
  if (status === "preorder") {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  }
  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
}

export function BookList({ books }: BookListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [items, setItems] = useState<AdminBookListItem[]>(books)
  const [savedIds, setSavedIds] = useState<string[]>(
    books.map((book) => book.id),
  )
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setItems(books)
    setSavedIds(books.map((book) => book.id))
  }, [books])

  const currentIds = items.map((item) => item.id)
  const dirty =
    currentIds.length !== savedIds.length ||
    currentIds.some((id, index) => id !== savedIds[index])

  function moveItem(from: number, to: number): void {
    setItems((prev) => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) {
        return prev
      }
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      if (!moved) {
        return prev
      }
      next.splice(to, 0, moved)
      return next
    })
  }

  function handleSaveOrder(): void {
    const sortedOrders = [...items]
      .map((item) => item.order)
      .sort((a, b) => a - b)
    const initialById = new Map(books.map((book) => [book.id, book.order]))
    const payload: Array<{ id: string; order: number }> = []
    items.forEach((item, index) => {
      const nextOrder = sortedOrders[index] ?? index
      if (initialById.get(item.id) !== nextOrder) {
        payload.push({ id: item.id, order: nextOrder })
      }
    })
    if (payload.length === 0) {
      setSavedIds(currentIds)
      return
    }

    setError(null)
    startTransition(async () => {
      const result = await reorderBooks(payload)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setSavedIds(currentIds)
      router.refresh()
    })
  }

  function handleReset(): void {
    const byId = new Map(books.map((book) => [book.id, book]))
    const next: AdminBookListItem[] = []
    for (const id of savedIds) {
      const book = byId.get(id)
      if (book) {
        next.push(book)
      }
    }
    for (const book of books) {
      if (!savedIds.includes(book.id)) {
        next.push(book)
      }
    }
    setItems(next)
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No books yet. Create the first entry.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {dirty ? (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-gray-200 p-3 dark:border-gray-800">
          <p className="text-sm">Order changed.</p>
          <Button size="sm" disabled={isPending} onClick={handleSaveOrder}>
            {isPending ? "Saving..." : "Save order"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={isPending}
            onClick={handleReset}
          >
            Reset
          </Button>
          {error ? (
            <span
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">
                Order
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Title
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Release
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                Featured
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((book, index) => (
              <tr
                key={book.id}
                draggable
                onDragStart={() => setDragFrom(index)}
                onDragOver={(event) => {
                  event.preventDefault()
                  if (dragFrom !== null && dragFrom !== index) {
                    moveItem(dragFrom, index)
                    setDragFrom(index)
                  }
                }}
                onDragEnd={() => setDragFrom(null)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragFrom(null)
                }}
                className={
                  dragFrom === index
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "border-t border-gray-200 dark:border-gray-800"
                }
              >
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className="mr-2 inline-block cursor-grab text-gray-400"
                    aria-hidden="true"
                    title="Drag to reorder"
                  >
                    ⋮⋮
                  </span>
                  <span className="mr-2 text-gray-500 dark:text-gray-400">
                    {book.order}
                  </span>
                  <span className="inline-flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={index === 0 || isPending}
                      onClick={() => moveItem(index, index - 1)}
                      aria-label={`Move ${book.title} up`}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={index === items.length - 1 || isPending}
                      onClick={() => moveItem(index, index + 1)}
                      aria-label={`Move ${book.title} down`}
                    >
                      ↓
                    </Button>
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className="font-medium">{book.title}</span>
                  {book.subtitle ? (
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {book.subtitle}
                    </span>
                  ) : null}
                  <span className="block text-xs text-gray-400 dark:text-gray-500">
                    /{book.slug}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(book.status)}`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {book.releaseDate ?? "—"}
                </td>
                <td className="px-3 py-2 text-center">
                  {book.featured ? (
                    <span aria-label="Featured" title="Featured">
                      ★
                    </span>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-700">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <span className="flex items-center justify-end gap-2">
                    <LinkButton
                      href={`/admin/books/${book.id}`}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </LinkButton>
                    <DeleteBookButton id={book.id} title={book.title} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
