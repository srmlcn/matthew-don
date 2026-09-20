"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import { colors } from "@/lib/theme"

interface AdminNavItem {
  href: string
  label: string
  phase: string
  enabled: boolean
}

const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", phase: "Phase 0", enabled: true },
  { href: "/admin/books", label: "Books", phase: "Phase 1", enabled: true },
  { href: "/admin/media", label: "Media", phase: "Phase 2", enabled: true },
  {
    href: "/admin/settings",
    label: "Settings",
    phase: "Phase 3",
    enabled: true,
  },
  { href: "/admin/pages", label: "Pages", phase: "Phase 4", enabled: true },
  {
    href: "/admin/newsletter",
    label: "Newsletter",
    phase: "Phase 5",
    enabled: false,
  },
  { href: "/admin/seo", label: "SEO", phase: "Phase 5", enabled: false },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Admin sections">
      <ul className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {adminNavItems.map((item) => {
          const isActive =
            item.enabled &&
            (pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)))
          return (
            <li key={item.href} className="shrink-0 md:shrink">
              {item.enabled ? (
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-gray-100 md:whitespace-normal dark:hover:bg-gray-800",
                    isActive && "bg-gray-100 dark:bg-gray-800"
                  )}
                  style={
                    isActive
                      ? {
                          boxShadow: `inset 2px 0 0 ${colors.brand.secondary.default}`,
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm whitespace-nowrap text-gray-400 md:whitespace-normal dark:text-gray-500"
                >
                  {item.label}
                  <span className="text-xs">{item.phase}</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
