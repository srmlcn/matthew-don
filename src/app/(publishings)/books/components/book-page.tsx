import { Availability } from "@/app/(publishings)/components/availability"
import { BookInfo } from "@/app/(publishings)/components/book-info"
import { Carousel } from "@/app/(publishings)/components/carousel"
import { Reviews } from "@/app/(publishings)/components/reviews"
import { BookCover } from "@/app/components/book-cover"
import { LinkButtons } from "@/app/components/link-buttons"
import { BookData } from "@/lib/book-data"

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
