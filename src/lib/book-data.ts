import {
  adventuresOfLucaAndKaiTheMoonQueenImageData,
  celebrationOfTheHistoryOfCelebratingHistoryImageData,
  type ImageData,
} from "./image-data"
import {
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
