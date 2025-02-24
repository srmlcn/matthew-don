import {
  adventuresOfLucaAndKaiBook2of3ImageData,
  adventuresOfLucaAndKaiBook3of3ImageData,
  adventuresOfLucaAndKaiTheMoonQueenImageData,
  celebrationOfTheHistoryOfCelebratingHistoryImageData,
  type ImageData,
} from "./image-data"
import {
  adventuresOfLucaAndKaiBook2of3LinkData,
  adventuresOfLucaAndKaiBook3of3LinkData,
  adventuresOfLucaAndKaiTheMoonQueenLinkData,
  celebrationOfTheHistoryOfCelebratingHistoryLinkData,
  type LinkData,
} from "./link-data"

export type BookData = {
  title: string
  descriptions: string[]
  imageData: ImageData
  linkData: LinkData
}

export const adventuresOfLucaAndKaiBook1of3BookData: BookData = {
  title: "The Adventures of Luca and Kai: The Moon Queen (Book 1 of 3)",
  descriptions: [
    "Fun for all ages!",
    "Available in paperback, Ebook, and FREE through Kindle Unlimited",
  ],
  imageData: adventuresOfLucaAndKaiTheMoonQueenImageData,
  linkData: adventuresOfLucaAndKaiTheMoonQueenLinkData,
}

export const adventuresOfLucaAndKaiBook2of3BookData: BookData = {
  title: "The Adventures of Luca and Kai (Book 2 of 3)",
  descriptions: ["Coming Soon..."],
  imageData: adventuresOfLucaAndKaiBook2of3ImageData,
  linkData: adventuresOfLucaAndKaiBook2of3LinkData,
}

export const adventuresOfLucaAndKaiBook3of3BookData: BookData = {
  title: "The Adventures of Luca and Kai (Book 3 of 3)",
  descriptions: ["Coming Not Quite As Soon..."],
  imageData: adventuresOfLucaAndKaiBook3of3ImageData,
  linkData: adventuresOfLucaAndKaiBook3of3LinkData,
}

export const celebrationOfTheHistoryOfCelebratingHistoryBookData: BookData = {
  title: "A Celebration of the History of Celebrating History",
  descriptions: [
    "Intended for mature audiences!",
    "Available in paperback, Ebook, and FREE through Kindle Unlimited",
  ],
  imageData: celebrationOfTheHistoryOfCelebratingHistoryImageData,
  linkData: celebrationOfTheHistoryOfCelebratingHistoryLinkData,
}

export const books: BookData[] = [
  adventuresOfLucaAndKaiBook1of3BookData,
  celebrationOfTheHistoryOfCelebratingHistoryBookData,
]

export const upcomingBooks: BookData[] = [
  adventuresOfLucaAndKaiBook2of3BookData,
  adventuresOfLucaAndKaiBook3of3BookData,
]
