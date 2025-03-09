import { BookCover } from "@/app/components/book-cover"
import { LinkButtons } from "@/app/components/link-buttons"
import { BookData } from "@/lib/book-data"
import { Availability } from "../../components/availability"
import { BookInfo } from "../../components/book-info"
import { Carousel } from "../../components/carousel"
import { Reviews } from "../../components/reviews"

export function ComicPage({
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
        classNames={{ image: "max-h-[48rem]" }}
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
