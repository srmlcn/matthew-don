import { getSiteSettings } from "@/lib/data/settings"

export async function SiteFooter() {
  const settings = await getSiteSettings()
  const currentYear = new Date().getFullYear()
  const footerText = settings.footer
    ? settings.footer
        .replace(/\{year\}/g, String(currentYear))
        .replace(/\b2025\b/g, String(currentYear))
    : `© ${currentYear} ${settings.name}. All rights reserved.`

  return (
    <footer className="flex p-6 items-center justify-center">
      <p>{footerText}</p>
    </footer>
  )
}
