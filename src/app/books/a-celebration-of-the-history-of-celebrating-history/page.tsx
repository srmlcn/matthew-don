import {
  celebrationOfTheHistoryOfCelebratingHistoryImageData as imageData,
  celebrationOfTheHistoryOfCelebratingHistoryImagesData as imagesData,
} from "@/lib/image-data"
import { BookPage, BookPageProps } from "../components/book-page"
import { celebrationOfTheHistoryOfCelebratingHistoryLinkData as linkData } from "@/lib/link-data"
import { celebrationOfTheHistoryOfCelebratingHistoryReviewsData as reviewsData } from "@/lib/review-data"

const props: BookPageProps = {
  title: "A Celebration of the History of Celebrating History",
  descriptions: [
    "PLEASE NOTE this book is purely a work of fiction, and does not contain any historical accuracy. FURTHERMORE, this book is intended for adults only. Yes, the humor is immature, but on top of terrible language and some cringeworthy attempts at jokes, the story also delves into serious and potentially triggering topics like depression and suicide.",
    "We all love spending a day off work and eating obscene amounts of food on our favorite holidays, but do you know the stories behind these special days? Join me as we take a journey through history and learn how our traditions came to be. Your mind will swell with knowledge as you learn things like how the customs of Halloween spur from a despicable dentist looking to make money by rotting the teeth of children, or how Hanukkah celebrates the unexpectedly decent career of Adam Sandler. You will bask in glorious wisdom while you discover how the Romans celebrated the new year by having drunken orgies, and how Cinco de Mayo was born thanks to hot dogs and an inept French cook. You will learn all this and more within the pages of this informational text, A Celebration of the History of Celebrating History.",
  ],
  secondaryDescription:
    "Available now in paperback, Ebook, and FREE through Kindle Unlimited!",
  image: imageData,
  images: imagesData,
  link: linkData,
  reviews: reviewsData,
}

export default function Page() {
  return <BookPage {...props} />
}
