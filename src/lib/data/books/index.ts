/**
 * Books Data
 * 
 * Centralized export for all book data and helper functions.
 * This is the main entry point for accessing book information throughout the app.
 * 
 * @example
 * import { allBooks, getBookBySlug, publishedBooks } from '@/lib/data/books';
 */

import type { Book, BookCategory, BookStatus } from './types';
import { moonQueen, celestialSamurai, book3 } from './adventures-series';
import { lucaAndKaiComics } from './comics';
import { celebrationOfHistory } from './standalone';

// Export types
export type { Book, BookCategory, BookStatus, BookImage, BookLink, BookReview, SeriesInfo } from './types';

// All books in the system
export const allBooks: Book[] = [
  celestialSamurai,  // order: 1 (featured)
  moonQueen,         // order: 2
  lucaAndKaiComics,  // order: 3
  celebrationOfHistory, // order: 4
  book3,             // order: 100 (upcoming)
];

// Books by status
export const publishedBooks = allBooks
  .filter((book) => book.status === 'published')
  .sort((a, b) => {
    if (!a.releaseDate || !b.releaseDate) return 0;
    return b.releaseDate.getTime() - a.releaseDate.getTime();
  });

export const preorderBooks = allBooks
  .filter((book) => book.status === 'preorder')
  .sort((a, b) => a.order - b.order);

export const upcomingBooks = allBooks
  .filter((book) => book.status === 'upcoming')
  .sort((a, b) => a.order - b.order);

export const featuredBooks = allBooks
  .filter((book) => book.featured)
  .sort((a, b) => a.order - b.order);

// Books by category
export const adventureBooks = allBooks
  .filter((book) => book.category === 'adventures')
  .sort((a, b) => a.order - b.order);

export const comedyBooks = allBooks
  .filter((book) => book.category === 'comedy')
  .sort((a, b) => a.order - b.order);

export const comicsBooks = allBooks
  .filter((book) => book.category === 'comics')
  .sort((a, b) => a.order - b.order);

/**
 * Get a book by its slug
 * @param slug - The URL slug of the book
 * @returns The book if found, undefined otherwise
 */
export function getBookBySlug(slug: string): Book | undefined {
  return allBooks.find((book) => book.slug === slug);
}

/**
 * Get books by category
 * @param category - The book category
 * @returns Array of books in that category
 */
export function getBooksByCategory(category: BookCategory): Book[] {
  return allBooks
    .filter((book) => book.category === category)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get books by status
 * @param status - The book status
 * @returns Array of books with that status
 */
export function getBooksByStatus(status: BookStatus): Book[] {
  return allBooks
    .filter((book) => book.status === status)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get the featured book (lowest order number with featured: true)
 * @returns The featured book if one exists, undefined otherwise
 */
export function getFeaturedBook(): Book | undefined {
  return featuredBooks[0];
}

// Legacy data structure support (for backward compatibility during migration)
// TODO: Remove once all components are updated

export const BOOK_CATEGORIES = {
  ADVENTURES: 'adventures' as const,
  COMEDY: 'comedy' as const,
  COMICS: 'comics' as const,
  OTHERS: 'comedy' as const, // Alias for backward compatibility
};

// Individual book exports for direct access
export { moonQueen, celestialSamurai, book3 } from './adventures-series';
export { lucaAndKaiComics } from './comics';
export { celebrationOfHistory } from './standalone';

// Legacy named exports (for backward compatibility)
export const adventuresOfLucaAndKaiBook1of3BookData = moonQueen;
export const adventuresOfLucaAndKaiBook2of3BookData = celestialSamurai;
export const adventuresOfLucaAndKaiBook3of3BookData = book3;
export const adventuresOfLucaAndKaiTheComicsBookData = lucaAndKaiComics;
export const celebrationOfTheHistoryOfCelebratingHistoryBookData = celebrationOfHistory;

// Legacy array exports
export const books = publishedBooks;
