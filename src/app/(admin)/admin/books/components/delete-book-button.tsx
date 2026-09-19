"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteBook } from "../actions"

interface DeleteBookButtonProps {
  id: string
  title: string
}

export function DeleteBookButton({ id, title }: DeleteBookButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleClick(): void {
    if (!confirming) {
      setConfirming(true)
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await deleteBook(id)
      if (!result.ok) {
        setError(result.error)
        setConfirming(false)
        return
      }
      router.refresh()
    })
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <span className="inline-flex gap-2">
        <Button
          type="button"
          variant={confirming ? "default" : "outline"}
          size="sm"
          disabled={isPending}
          onClick={handleClick}
          aria-label={confirming ? `Confirm delete ${title}` : `Delete ${title}`}
        >
          {isPending ? "Deleting..." : confirming ? "Confirm" : "Delete"}
        </Button>
        {confirming && !isPending ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </Button>
        ) : null}
      </span>
      {error ? (
        <span role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      ) : null}
    </span>
  )
}
