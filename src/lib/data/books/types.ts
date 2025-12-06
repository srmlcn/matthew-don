/**
 * Book Data Types
 *
 * Centralized type definitions for all book-related data structures.
 */

export type BookStatus = "published" | "preorder" | "upcoming"

export type BookCategory = "adventures" | "comedy" | "comics"

export interface BookImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface BookLink {
  url: string
  label: string
}

export interface BookReview {
  name: string
  description: string
  review: string
  stars: number
}

export interface SeriesInfo {
  name: string
  book: number
  total: number
}

export interface Book {
  // Identifiers
  id: string
  slug: string

  // Basic info
  title: string
  subtitle?: string
  seriesInfo?: SeriesInfo

  // Status and categorization
  status: BookStatus
  category: BookCategory
  releaseDate?: Date
  featured: boolean
  order: number

  // Content
  shortDescription: string
  longDescription: string[]
  contentWarnings?: string[]

  // Media
  cover: BookImage
  previewImages: BookImage[]

  // Links
  links: {
    amazon?: BookLink
    goodreads?: BookLink
    internal?: string // route path
  }

  // Social proof
  reviews: BookReview[]

  // Metadata
  availability: string
  isbn?: string
  pageCount?: number
}
