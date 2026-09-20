import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/data/settings"
import { SettingsTabs } from "./components/settings-tabs"
import { SettingsForm } from "./components/settings-form"

export const metadata: Metadata = {
  title: "Site Settings",
}

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage site branding, canonical URL, socials, and contact information.
        </p>
      </div>

      <SettingsTabs />

      <SettingsForm initialSettings={settings} />
    </div>
  )
}
