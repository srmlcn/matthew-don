import type { PageSectionContent, SectionCta, SectionImage } from "@/lib/db/schema"

export type { PageSectionContent, SectionCta, SectionImage }

export interface PageRecord {
  id: string
  title: string
  slug: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface PageSectionRecord<T = PageSectionContent> {
  id: number
  page: string
  sectionKey: string
  content: T
  sortOrder: number
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

export interface HeroSectionContent extends PageSectionContent {
  title?: string
  subtitle?: string
  paragraphs: string[]
  primaryCta?: SectionCta
  secondaryCta?: SectionCta
  image?: SectionImage
}

export interface AboutBioSectionContent extends PageSectionContent {
  title?: string
  paragraphs: string[]
  connectHeading?: string
  image?: SectionImage
}

export interface ContactIntroSectionContent extends PageSectionContent {
  title?: string
  paragraphs: string[]
  connectHeading?: string
  image?: SectionImage
}

export interface InvitationSectionContent extends PageSectionContent {
  title?: string
  paragraphs: string[]
  primaryCta?: SectionCta
}

export interface NewsletterSectionContent extends PageSectionContent {
  title?: string
  subtitle?: string
  paragraphs: string[]
  primaryCta?: SectionCta
  placeholder?: string
  footnote?: string
  successMessage?: string
}
