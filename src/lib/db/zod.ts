/**
 * Zod schemas derived from Drizzle tables for future admin forms.
 */

import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import {
  bookImages,
  bookLinks,
  bookReviews,
  books,
  mediaAssets,
  navItems,
  newsletterSubscribers,
  pageSections,
  pages,
  seoOverrides,
  siteSettings,
} from "./schema"

export const insertBookSchema = createInsertSchema(books)
export const selectBookSchema = createSelectSchema(books)
export const insertBookImageSchema = createInsertSchema(bookImages)
export const insertBookLinkSchema = createInsertSchema(bookLinks)
export const insertBookReviewSchema = createInsertSchema(bookReviews)
export const selectBookReviewSchema = createSelectSchema(bookReviews)
export const insertNewsletterSubscriberSchema =
  createInsertSchema(newsletterSubscribers)
export const selectNewsletterSubscriberSchema =
  createSelectSchema(newsletterSubscribers)
export const insertSeoOverrideSchema = createInsertSchema(seoOverrides)
export const selectSeoOverrideSchema = createSelectSchema(seoOverrides)
export const insertMediaAssetSchema = createInsertSchema(mediaAssets)
export const selectMediaAssetSchema = createSelectSchema(mediaAssets)
export const insertSiteSettingSchema = createInsertSchema(siteSettings)
export const selectSiteSettingSchema = createSelectSchema(siteSettings)
export const insertNavItemSchema = createInsertSchema(navItems)
export const selectNavItemSchema = createSelectSchema(navItems)
export const insertPageSchema = createInsertSchema(pages)
export const selectPageSchema = createSelectSchema(pages)
export const insertPageSectionSchema = createInsertSchema(pageSections)
export const selectPageSectionSchema = createSelectSchema(pageSections)

