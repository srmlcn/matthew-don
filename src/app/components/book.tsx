"use client"

import Image from "next/image"
import Link from "next/link"
import { LinkButtons } from "./link-buttons"
import { BookData } from "@/lib/book-data"

export function Book({ title, descriptions, imageData, linkData }: BookData) {
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
      <LinkButtons linkData={linkData} />
    </div>
  )
}
