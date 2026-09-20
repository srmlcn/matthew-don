"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import type { NewsletterSubscriberItem } from "@/lib/data/newsletter"
import { deleteSubscriber, updateSubscriberStatus } from "../actions"

interface SubscriberListProps {
  initialSubscribers: NewsletterSubscriberItem[]
}

export function SubscriberList({ initialSubscribers }: SubscriberListProps) {
  const [subscribers, setSubscribers] =
    useState<NewsletterSubscriberItem[]>(initialSubscribers)
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  )

  function handleExportCsv(): void {
    const headers = "id,email,status,source,createdAt\n"
    const rows = filtered
      .map(
        (s) =>
          `"${s.id}","${s.email}","${s.status}","${s.source}","${new Date(s.createdAt).toISOString()}"`,
      )
      .join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `subscribers_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleStatusChange(id: number, nextStatus: string): void {
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const res = await updateSubscriberStatus(id, nextStatus)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setSubscribers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s)),
      )
      setSuccess("Subscriber status updated.")
    })
  }

  function handleDelete(id: number, email: string): void {
    if (!confirm(`Delete subscriber ${email}?`)) return
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const res = await deleteSubscriber(id)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setSubscribers((prev) => prev.filter((s) => s.id !== id))
      setSuccess(`Deleted ${email}.`)
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900 w-64"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleExportCsv}
          disabled={filtered.length === 0}
        >
          Export CSV ({filtered.length})
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Subscribed At</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="px-3 py-2 font-medium">{s.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <select
                      value={s.status}
                      disabled={isPending}
                      onChange={(e) => handleStatusChange(s.id, e.target.value)}
                      className="rounded border border-gray-300 px-2 py-0.5 text-xs dark:border-gray-700 dark:bg-gray-900"
                    >
                      <option value="active">Active</option>
                      <option value="unsubscribed">Unsubscribed</option>
                      <option value="bounced">Bounced</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-gray-500">{s.source}</td>
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleDelete(s.id, s.email)}
                    >
                      Delete
                    </Button>
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
