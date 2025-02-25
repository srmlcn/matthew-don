"use client"

import { LinkButtons } from "@/app/components/link-buttons"

import { Carousel } from "./carousel"
import { BookData } from "@/lib/book-data"
import { CoverImage } from "./cover-image"
import { BookInfo } from "./book-info"
import { Reviews } from "./reviews"
import { Availability } from "./availability"

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
