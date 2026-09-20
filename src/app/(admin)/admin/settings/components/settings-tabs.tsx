"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"

export function SettingsTabs() {
  const pathname = usePathname()
  const isNav = pathname.startsWith("/admin/settings/nav")

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
      <Link
        href="/admin/settings"
        className={cn(
          "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
          !isNav
            ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        )}
      >
        General Settings
      </Link>
      <Link
        href="/admin/settings/nav"
        className={cn(
          "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
          isNav
            ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        )}
      >
        Navigation
      </Link>
    </div>
  )
}
