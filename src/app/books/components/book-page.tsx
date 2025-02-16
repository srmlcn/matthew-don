"use client"

import type { ImageData } from "@/lib/image-data"
import type { LinkData } from "@/lib/link-data"
import type { ReviewData } from "@/lib/review-data"
import { StarIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { Carousel } from "./carousel"
import { FaAmazon } from "react-icons/fa"

export type BookPageProps = {
  title: string
  descriptions: string[]
  secondaryDescription: string
  coverImageData: ImageData
  previewImageData: ImageData[]
  linkData: LinkData
  reviewData: ReviewData[]
}

export function BookPage({
  title,
  descriptions,
  secondaryDescription,
  coverImageData,
  previewImageData,
  linkData,
  reviewData,
}: BookPageProps) {
  return (
    <div className="flex flex-col items-center gap-24">
      <Image
        src={coverImageData.src}
        alt={coverImageData.alt}
        width={coverImageData.width}
        height={coverImageData.height}
        className={`max-h-[72rem] w-auto aspect-[${coverImageData.width}/${coverImageData.height}]`}
      />
      <div className="flex flex-col items-center gap-4">
        <p className="font-bold text-4xl text-center mb-4">{title}</p>
        {descriptions.map((description, index) => (
          <p className="text-indent sm:indent-8" key={index}>
            {description}
          </p>
        ))}
      </div>
      <div className="max-h-[64rem] w-full">
        <Carousel images={previewImageData} />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {reviewData.map((review) => (
          <div key={review.name} className="flex flex-col gap-4">
            <p className="text-center">{review.review}</p>

            <div>
              <p className="font-bold text-xl text-center">{review.name}</p>
              <p className="text-center">{review.description}</p>
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: review.stars }).map((_, index) => (
                <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        as={Link}
        color="primary"
        href={linkData.external.href}
        target="_blank"
        rel="noopener noreferrer"
        startContent={<FaAmazon className="text-lg" />}
      >
        {linkData.external.label}
      </Button>
      <p className="text-center">{secondaryDescription}</p>
    </div>
  )
}
