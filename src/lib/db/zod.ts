/**
 * Zod schemas derived from Drizzle tables for future admin forms.
 */

import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import {
  bookImages,
  bookLinks,
  bookReviews,
  books,
} from "./schema"

export const insertBookSchema = createInsertSchema(books)
export const selectBookSchema = createSelectSchema(books)
export const insertBookImageSchema = createInsertSchema(bookImages)
export const insertBookLinkSchema = createInsertSchema(bookLinks)
export const insertBookReviewSchema = createInsertSchema(bookReviews)
