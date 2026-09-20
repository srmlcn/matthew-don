"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"

const TABS = [
  { id: "all", label: "All Pages", href: "/admin/pages" },
  { id: "home", label: "Home", href: "/admin/pages?page=home" },
  { id: "about", label: "About", href: "/admin/pages?page=about" },
  { id: "contact", label: "Contact", href: "/admin/pages?page=contact" },
]

export function PagesTabs() {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page") ?? "all"

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive =
          (tab.id === "all" && !searchParams.has("page")) ||
          currentPage === tab.id

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              isActive
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
