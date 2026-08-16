/**
 * Books Data
 *
 * Centralized export for all book data and helper functions.
 * This is the main entry point for accessing book information throughout the app.
 *
 * @example
 * import { getAllBooks, getBookBySlug, getBooksByStatus } from '@/lib/data/books';
 */

export type {
  Book,
  BookCategory,
  BookStatus,
  BookImage,
  BookLink,
  BookReview,
  SeriesInfo,
} from "./types"

export {
  BOOKS_CACHE_TAG,
  getAllBooks,
  getBookBySlug,
  getBooksByCategory,
  getBooksByStatus,
  getFeaturedBook,
} from "./queries"

export {
  getBookPath,
  getBookNavLabel,
  getBooksNav,
  getBookByPath,
} from "./navigation"
export { generateBookMetadata, getBookPageTitle } from "./metadata"
