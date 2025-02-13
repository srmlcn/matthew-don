"use client"

import type { ImageData } from "@/lib/image-data"
import type { LinkData } from "@/lib/link-data"
import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export type BookProps = {
  title: string
  descriptions: string[]
  image: ImageData
  link: LinkData
}

export function Book({ title, descriptions, image, link }: BookProps) {
  const bookCover = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`max-h-[32rem] w-auto aspect-[${image.width}/${image.height}]`}
    />
  )

  return (
    <div className="flex flex-col items-center gap-4">
      {link.internal ? (
        <Link href={link.internal.href}>{bookCover}</Link>
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
        href={link.external.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.external.label}
      </Button>
    </div>
  )
}
