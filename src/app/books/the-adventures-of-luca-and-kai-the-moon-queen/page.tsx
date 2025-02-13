import {
  adventuresOfLucaAndKaiTheMoonQueenImageData as imageData,
  adventuresOfLucaAndKaiTheMoonQueenImagesData as imagesData,
} from "@/lib/image-data"
import { BookPage, BookPageProps } from "../components/book-page"
import { adventuresOfLucaAndKaiTheMoonQueenLinkData as linkData } from "@/lib/link-data"
import { adventuresOfLucaAndKaiTheMoonQueenReviewsData as reviewsData } from "@/lib/review-data"

const props: BookPageProps = {
  title: "The Adventures of Luca and Kai: The Moon Queen",
  descriptions: [
    "Luca and Kai are two young brothers with an openness for adventure that's as big as their imagination. At least what their imagination can allow while grounded in their room. When two portals open next to them, they are thrust into an experience like no other, meeting unique friends and fearsome enemies along the way. Through fast paced action, hilarious antics and mind-bending physics, our heroes discover they are in control of their own destinies. Who will they decide to become?",
  ],
  image: imageData,
  link: linkData,
  images: imagesData,
  reviews: reviewsData,
  secondaryDescription:
    "Available now in paperback, Ebook, and FREE through Kindle Unlimited!",
}

export default function Page() {
  return <BookPage {...props} />
}
