import type { SiteContact, SiteSocials } from "@/lib/db/schema"
import type { NavItem } from "@/lib/config/navigation"

export interface SiteSettings {
  id: string
  name: string
  tagline: string
  canonicalUrl: string
  ogImage: string
  footer: string
  socials: SiteSocials
  contact: SiteContact
}

export interface DbNavItem {
  id: number
  label: string
  href: string
  section: string
  order: number
  external: boolean
  description: string | null
  visible: boolean
  createdAt: Date
  updatedAt: Date
}

export type { NavItem }
