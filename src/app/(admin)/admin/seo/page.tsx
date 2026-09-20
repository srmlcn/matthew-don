import type { Metadata } from "next"
import { getAllSeoOverrides } from "@/lib/data/seo"
import { SeoManager } from "./components/seo-manager"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "SEO Overrides",
}

export default async function AdminSeoPage() {
  const overrides = await getAllSeoOverrides()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">SEO Overrides</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage granular metadata, OpenGraph tags, canonical URLs, and robot directives for catalog books and site pages.
        </p>
      </div>
      <Divider />
      <SeoManager initialOverrides={overrides} />
    </div>
  )
}
