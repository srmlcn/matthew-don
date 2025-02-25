import { BookCover } from "@/app/components/book-cover"
import { LinkButtons } from "@/app/components/link-buttons"
import { BookData } from "@/lib/book-data"
import { Availability } from "./availability"
import { BookInfo } from "./book-info"
import { Carousel } from "./carousel"
import { Reviews } from "./reviews"

export function BookPage({
  title,
  descriptionsExpanded,
  availability,
  imageData,
  previewImagesData,
  linkData,
  reviewData,
}: BookData) {
  return (
    <div className="flex flex-col items-center gap-24">
      <BookCover
        imageData={imageData}
        className="max-h-[72rem] h-full w-full flex items-center"
      />

      <BookInfo title={title} descriptionsExpanded={descriptionsExpanded} />

      <Carousel
        images={previewImagesData ?? []}
        className="max-h-[64rem] w-full"
      />

      <Reviews reviewData={reviewData ?? []} />

      <LinkButtons linkData={linkData} />

      <Availability availability={availability ?? ""} />
    </div>
  )
}
