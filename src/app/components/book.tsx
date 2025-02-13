"use client"

import type { ImageData } from "@/lib/image-data"
import type { LinkData } from "@/lib/link-data"
import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export type BookProps = {
  title: string
  descriptions: string[]
  imageData: ImageData
  linkData: LinkData
}

export function Book({ title, descriptions, imageData, linkData }: BookProps) {
  const bookCover = (
    <Image
      src={imageData.src}
      alt={imageData.alt}
      width={imageData.width}
      height={imageData.height}
      className={`max-h-[32rem] w-auto aspect-[${imageData.width}/${imageData.height}]`}
    />
  )

  return (
    <div className="flex flex-col items-center gap-4">
      {linkData.internal ? (
        <Link href={linkData.internal.href}>{bookCover}</Link>
      ) : (
        bookCover
      )}

      <p className="font-bold text-xl text-center">{title}</p>
      <div className="flex flex-col items-center gap-2">
        {descriptions.map((description, index) => (
          <p className="text-center" key={index}>
            {description}
          </p>
        ))}
      </div>
      <Button
        as={Link}
        href={linkData.external.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkData.external.label}
      </Button>
    </div>
  )
}
