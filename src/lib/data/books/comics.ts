/**
 * Comics
 *
 * Book data for The Adventures of Luca and Kai comics.
 */

import type { Book, BookImage } from "./types"

const comicsCover: BookImage = {
  src: "/adventures/comics-cover.jpg",
  alt: "The Adventures of Luca and Kai: The Comics book cover",
  width: 1231,
  height: 1850,
}

const comicsPreviews: BookImage[] = [
  {
    src: "/adventures/comics-1.jpg",
    alt: "The Adventures of Luca and Kai: The Comics - Preview page 1",
    width: 1026,
    height: 1539,
  },
  {
    src: "/adventures/comics-2.jpg",
    alt: "The Adventures of Luca and Kai: The Comics - Preview page 2",
    width: 1026,
    height: 1539,
  },
]

export const lucaAndKaiComics: Book = {
  id: "luca-kai-comics",
  slug: "the-adventures-of-luca-and-kai-the-comics",

  title: "The Adventures of Luca and Kai",
  subtitle: "The Comics",

  status: "published",
  category: "comics",
  releaseDate: new Date("2025-01-13"),
  featured: false,
  order: 3,

  shortDescription: "Fun for all ages!",
  longDescription: [
    "Join Luca and Kai on their adventures in a brand new way! Featuring original artwork by Christopher Don, travel the cosmos through the beautiful, fully colored panels of Adventures of Luca and Kai: The Comics!",
  ],

  cover: comicsCover,
  previewImages: comicsPreviews,

  links: {
    amazon: {
      url: "https://www.amazon.com/Adventures-Luca-Kai-Queen-Comics/dp/B0DWMWC7LQ",
      label: "Check out on Amazon!",
    },
    goodreads: {
      url: "https://www.goodreads.com/book/show/227847038-the-adventures-of-luca-and-kai",
      label: "Check out on Goodreads!",
    },
    internal: "/comics/the-adventures-of-luca-and-kai-the-comics",
  },

  reviews: [],

  availability: "Available now in paperback!",
}
