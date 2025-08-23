import {
  adventuresOfLucaAndKaiBook2of3ImageData,
  adventuresOfLucaAndKaiBook3of3ImageData,
  adventuresOfLucaAndKaiTheComicsImageData,
  adventuresOfLucaAndKaiTheComicsImagesData,
  adventuresOfLucaAndKaiTheMoonQueenImageData,
  adventuresOfLucaAndKaiTheMoonQueenImagesData,
  celebrationOfTheHistoryOfCelebratingHistoryImageData,
  celebrationOfTheHistoryOfCelebratingHistoryImagesData,
  type ImageData,
} from "./image-data"
import {
  adventuresOfLucaAndKaiBook2of3LinkData,
  adventuresOfLucaAndKaiBook3of3LinkData,
  adventuresOfLucaAndKaiTheComicsLinkData,
  adventuresOfLucaAndKaiTheMoonQueenLinkData,
  celebrationOfTheHistoryOfCelebratingHistoryLinkData,
  type LinkData,
} from "./link-data"
import {
  adventuresOfLucaAndKaiTheMoonQueenReviewsData,
  celebrationOfTheHistoryOfCelebratingHistoryReviewsData,
  ReviewData,
} from "./review-data"

export const BOOK_CATEGORIES = {
  ADVENTURES: "adventures",
  OTHERS: "others",
}

export type BookData = {
  title: string
  descriptions: string[]
  descriptionsExpanded?: string[]
  category?: string
  availability?: string
  imageData: ImageData
  linkData: LinkData
  previewImagesData?: ImageData[]
  reviewData?: ReviewData[]
  releaseDate?: Date
}

export const adventuresOfLucaAndKaiBook1of3BookData: BookData = {
  title: "The Adventures of Luca and Kai: The Moon Queen (Book 1 of 3)",
  descriptions: [
    "Fun for all ages!",
    "Available in paperback, Ebook, and FREE through Kindle Unlimited",
  ],
  descriptionsExpanded: [
    "Luca and Kai are two young brothers with an openness for adventure that's as big as their imagination. At least what their imagination can allow while grounded in their room. When two portals open next to them, they are thrust into an experience like no other, meeting unique friends and fearsome enemies along the way. Through fast paced action, hilarious antics and mind-bending physics, our heroes discover they are in control of their own destinies. Who will they decide to become?",
  ],
  category: BOOK_CATEGORIES.ADVENTURES,
  availability:
    "Available now in paperback, Ebook, and FREE through Kindle Unlimited!",
  imageData: adventuresOfLucaAndKaiTheMoonQueenImageData,
  previewImagesData: adventuresOfLucaAndKaiTheMoonQueenImagesData,
  linkData: adventuresOfLucaAndKaiTheMoonQueenLinkData,
  reviewData: adventuresOfLucaAndKaiTheMoonQueenReviewsData,
  releaseDate: new Date("2024-06-28"),
}

export const adventuresOfLucaAndKaiTheComicsBookData: BookData = {
  title: "The Adventures of Luca and Kai: The Comics",
  descriptions: ["Fun for all ages!", "Available in paperback"],
  descriptionsExpanded: [
    "Join Luca and Kai on their adventures in a brand new way! Featuring original artwork by Christopher Don, travel the cosmos through the beautiful, fully colored panels of Adventures of Luca and Kai: The Comics!",
  ],
  category: BOOK_CATEGORIES.ADVENTURES,
  availability: "Available now in paperback!",
  imageData: adventuresOfLucaAndKaiTheComicsImageData,
  previewImagesData: adventuresOfLucaAndKaiTheComicsImagesData,
  linkData: adventuresOfLucaAndKaiTheComicsLinkData,
  reviewData: [],
  releaseDate: new Date("2025-01-13"),
}

export const adventuresOfLucaAndKaiBook2of3BookData: BookData = {
  title: "The Adventures of Luca and Kai: The Celestial Samurai (Book 2 of 3)",
  descriptions: [
    "Fun for all ages!",
    "Available in paperback, Ebook, and FREE through Kindle Unlimited",
  ],
  descriptionsExpanded: [
    "Five years have passed since the crew of The Esby heroically saved the children on the moon. Luca and Kai have become celebrities, with the story of their bravery becoming known worldwide. But some doubt them, and after years without seeing their former crew, Luca and Kai begin to doubt themselves. That is until a familiar face returns, threatening the existence of Earth itself. Will the courageous brothers be able to stop The Celestial Samurai?",
  ],
  category: BOOK_CATEGORIES.ADVENTURES,
  imageData: adventuresOfLucaAndKaiBook2of3ImageData,
  linkData: adventuresOfLucaAndKaiBook2of3LinkData,
  releaseDate: new Date("2025-08-23"),
}

export const adventuresOfLucaAndKaiBook3of3BookData: BookData = {
  title: "The Adventures of Luca and Kai (Book 3 of 3)",
  descriptions: ["Coming Later..."],
  category: BOOK_CATEGORIES.ADVENTURES,
  imageData: adventuresOfLucaAndKaiBook3of3ImageData,
  linkData: adventuresOfLucaAndKaiBook3of3LinkData,
}

export const celebrationOfTheHistoryOfCelebratingHistoryBookData: BookData = {
  title: "A Celebration of the History of Celebrating History",
  descriptions: [
    "Intended for mature audiences!",
    "Available in paperback, Ebook, and FREE through Kindle Unlimited",
  ],
  descriptionsExpanded: [
    "PLEASE NOTE this book is purely a work of fiction, and does not contain any historical accuracy. FURTHERMORE, this book is intended for adults only. Yes, the humor is immature, but on top of terrible language and some cringeworthy attempts at jokes, the story also delves into serious and potentially triggering topics like depression and suicide.",
    "We all love spending a day off work and eating obscene amounts of food on our favorite holidays, but do you know the stories behind these special days? Join me as we take a journey through history and learn how our traditions came to be. Your mind will swell with knowledge as you learn things like how the customs of Halloween spur from a despicable dentist looking to make money by rotting the teeth of children, or how Hanukkah celebrates the unexpectedly decent career of Adam Sandler. You will bask in glorious wisdom while you discover how the Romans celebrated the new year by having drunken orgies, and how Cinco de Mayo was born thanks to hot dogs and an inept French cook. You will learn all this and more within the pages of this informational text, A Celebration of the History of Celebrating History.",
  ],
  category: BOOK_CATEGORIES.OTHERS,
  availability:
    "Available now in paperback, Ebook, and FREE through Kindle Unlimited!",
  imageData: celebrationOfTheHistoryOfCelebratingHistoryImageData,
  previewImagesData: celebrationOfTheHistoryOfCelebratingHistoryImagesData,
  linkData: celebrationOfTheHistoryOfCelebratingHistoryLinkData,
  reviewData: celebrationOfTheHistoryOfCelebratingHistoryReviewsData,
  releaseDate: new Date("2015-05-26"),
}

export const books: BookData[] = [
  adventuresOfLucaAndKaiBook1of3BookData,
  adventuresOfLucaAndKaiBook2of3BookData,
  adventuresOfLucaAndKaiTheComicsBookData,
  celebrationOfTheHistoryOfCelebratingHistoryBookData,
]

export const upcomingBooks: BookData[] = [
  adventuresOfLucaAndKaiBook3of3BookData,
]
