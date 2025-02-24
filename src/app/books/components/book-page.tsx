"use client"

import { LinkButtons } from "@/app/components/link-buttons"
import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { Carousel } from "./carousel"
import { BookData } from "@/lib/book-data"
import DOMPurify from "isomorphic-dompurify"

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
      <Image
        src={imageData.src}
        alt={imageData.alt}
        width={imageData.width}
        height={imageData.height}
        className={`max-h-[72rem] w-auto aspect-[${imageData.width}/${imageData.height}]`}
      />
      <section className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl text-center mb-4">{title}</h1>
        {descriptionsExpanded?.map((description, index) => (
          <p className="text-indent sm:indent-8" key={index}>
            {DOMPurify.sanitize(description)}
          </p>
        ))}
      </section>
      <section className="max-h-[64rem] w-full">
        <Carousel images={previewImagesData ?? []} />
      </section>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {reviewData?.map((review) => (
          <div key={review.name} className="flex flex-col gap-4">
            <p className="text-center">{review.review}</p>

            <div>
              <p className="font-bold text-xl text-center">{review.name}</p>
              <p className="text-center">
                {DOMPurify.sanitize(review.description)}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: review.stars }).map((_, index) => (
                <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </section>
      <LinkButtons linkData={linkData} />
      <p className="text-center">{DOMPurify.sanitize(availability ?? "")}</p>
    </div>
  )
}
