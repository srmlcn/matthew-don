"use client"

import { LinkButtons } from "@/app/components/link-buttons"

import { Carousel } from "./carousel"
import { BookData } from "@/lib/book-data"
import DOMPurify from "isomorphic-dompurify"
import { CoverImage } from "./cover-image"
import { BookInfo } from "./book-info"
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
      <p className="text-center">{DOMPurify.sanitize(availability ?? "")}</p>
    </div>
  )
}
