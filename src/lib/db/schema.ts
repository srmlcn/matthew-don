/**
 * Drizzle schema for the book catalog.
 */

import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const bookStatusEnum = pgEnum("book_status", [
  "published",
  "preorder",
  "upcoming",
])

export const bookCategoryEnum = pgEnum("book_category", [
  "adventures",
  "comedy",
  "comics",
])

export const bookImageKindEnum = pgEnum("book_image_kind", ["cover", "preview"])

export const bookLinkVendorEnum = pgEnum("book_link_vendor", [
  "amazon",
  "goodreads",
  "internal",
])

export const books = pgTable("books", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  status: bookStatusEnum("status").notNull(),
  category: bookCategoryEnum("category").notNull(),
  releaseDate: timestamp("release_date", { mode: "date" }),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  shortDescription: text("short_description").notNull(),
  longDescription: jsonb("long_description").$type<string[]>().notNull(),
  contentWarnings: jsonb("content_warnings").$type<string[] | null>(),
  availability: text("availability").notNull(),
  isbn: text("isbn"),
  pageCount: integer("page_count"),
  seriesName: text("series_name"),
  seriesBook: integer("series_book"),
  seriesTotal: integer("series_total"),
  navSection: text("nav_section"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export const bookImages = pgTable("book_images", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  kind: bookImageKindEnum("kind").notNull(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const bookLinks = pgTable("book_links", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  vendor: bookLinkVendorEnum("vendor").notNull(),
  url: text("url").notNull(),
  label: text("label").notNull(),
})

export const bookReviews = pgTable("book_reviews", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  review: text("review").notNull(),
  stars: integer("stars").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
})

export const mediaAssets = pgTable("media_assets", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  pathname: text("pathname").notNull().unique(),
  url: text("url").notNull().unique(),
  filename: text("filename").notNull(),
  alt: text("alt").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  contentType: text("content_type").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export interface SiteSocialItem {
  url: string
  handle?: string
  label?: string
}

export type SiteSocials = Record<string, SiteSocialItem>

export interface SiteContact {
  email?: string
  message?: string
  preferredMethods?: string[]
}

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("default"),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  canonicalUrl: text("canonical_url").notNull(),
  ogImage: text("og_image").notNull(),
  footer: text("footer").notNull(),
  socials: jsonb("socials").$type<SiteSocials>().notNull(),
  contact: jsonb("contact").$type<SiteContact>().notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export const navItems = pgTable("nav_items", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  section: text("section").notNull().default("main"),
  order: integer("order").notNull().default(0),
  external: boolean("external").notNull().default(false),
  description: text("description"),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export const booksRelations = relations(books, ({ many }) => ({
  images: many(bookImages),
  links: many(bookLinks),
  reviews: many(bookReviews),
}))

export const bookImagesRelations = relations(bookImages, ({ one }) => ({
  book: one(books, {
    fields: [bookImages.bookId],
    references: [books.id],
  }),
}))

export const bookLinksRelations = relations(bookLinks, ({ one }) => ({
  book: one(books, {
    fields: [bookLinks.bookId],
    references: [books.id],
  }),
}))

export const bookReviewsRelations = relations(bookReviews, ({ one }) => ({
  book: one(books, {
    fields: [bookReviews.bookId],
    references: [books.id],
  }),
}))
