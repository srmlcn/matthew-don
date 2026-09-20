import type { Metadata } from "next"
import { getAllDbNavItems } from "@/lib/data/settings"
import { SettingsTabs } from "../components/settings-tabs"
import { NavItemsManager } from "../components/nav-items-manager"

export const metadata: Metadata = {
  title: "Navigation Settings",
}

export default async function NavSettingsPage() {
  const items = await getAllDbNavItems()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage navigation links for header and footer.
        </p>
      </div>

      <SettingsTabs />

      <NavItemsManager initialItems={items} />
    </div>
  )
}
