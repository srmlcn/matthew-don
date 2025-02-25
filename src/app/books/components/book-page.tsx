import { LinkButtons } from "@/app/components/link-buttons"
import { BookData } from "@/lib/book-data"
import { Availability } from "./availability"
import { BookInfo } from "./book-info"
import { Carousel } from "./carousel"
import { CoverImage } from "./cover-image"
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
      <CoverImage {...imageData} />

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
