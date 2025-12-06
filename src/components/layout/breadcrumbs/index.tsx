/**
 * Breadcrumb Component
 *
 * Provides navigation breadcrumbs for improved UX and SEO.
 * Includes structured data for search engines.
 */

"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { BreadcrumbItem } from "@/lib/config/navigation"

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length <= 1) return null

  // Generate structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: item.href }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "font-medium text-gray-900 dark:text-gray-100"
                        : ""
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
