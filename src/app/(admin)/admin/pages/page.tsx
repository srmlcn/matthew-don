import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllDbPageSections } from "@/lib/data/pages"
import { PagesTabs } from "./components/pages-tabs"
import { PageSectionsManager } from "./components/page-sections-manager"

export const metadata: Metadata = {
  title: "Pages & Sections",
}

export default async function AdminPagesPage() {
  const sections = await getAllDbPageSections()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Page Sections</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage structured copy blocks, CTAs, and visibility across home,
          about, and contact pages.
        </p>
      </div>

      <Suspense fallback={null}>
        <PagesTabs />
      </Suspense>

      <Suspense fallback={<p className="text-sm text-gray-500">Loading sections...</p>}>
        <PageSectionsManager initialSections={sections} />
      </Suspense>
    </div>
  )
}
