import type { Metadata } from "next"
import Link from "next/link"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Dashboard",
}

interface AdminSection {
  title: string
  description: string
  phase: string
  href?: string
}

const adminSections: AdminSection[] = [
  {
    title: "Books",
    description: "Catalog entries, covers, links, reviews, and ordering.",
    phase: "Phase 1",
    href: "/admin/books",
  },
  {
    title: "Media",
    description: "Uploads and library for covers, previews, and photos.",
    phase: "Phase 2",
    href: "/admin/media",
  },
  {
    title: "Settings",
    description: "Site name, socials, contact, footer, and navigation.",
    phase: "Phase 3",
    href: "/admin/settings",
  },
  {
    title: "Pages",
    description: "Home, about, and contact copy blocks.",
    phase: "Phase 4",
    href: "/admin/pages",
  },
  {
    title: "Reviews",
    description: "Reader-review curation and visibility.",
    phase: "Phase 5",
  },
  {
    title: "Newsletter",
    description: "Subscribers, status, and export.",
    phase: "Phase 5",
  },
  {
    title: "SEO",
    description: "Metadata overrides for books and pages.",
    phase: "Phase 5",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Content management for matthewdon.com. Sections unlock as each
          migration phase ships.
        </p>
      </div>
      <Divider />
      <ul className="grid gap-4 sm:grid-cols-2">
        {adminSections.map((section) => (
          <li
            key={section.title}
            className="rounded-md border border-gray-200 p-4 dark:border-gray-800"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold">{section.title}</h2>
              <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {section.phase}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {section.description}
            </p>
            {section.href ? (
              <Link
                href={section.href}
                className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
              >
                Open →
              </Link>
            ) : (
              <p className="mt-2 text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
                Coming soon
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
