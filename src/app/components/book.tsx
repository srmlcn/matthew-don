"use client"

import type { ImageData } from "@/lib/image-data"
import type { LinkData } from "@/lib/link-data"
import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { FaAmazon, FaGoodreadsG } from "react-icons/fa"

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
      <div className="flex flex-col gap-4 items-center">
        {linkData.external.map((link) => {
          const classes: Record<string, string> = {
            amazon: "bg-amazon",
            goodreads: "bg-goodreads text-white"
          }

          const icons: Record<string, ReactNode> = {
            amazon: <FaAmazon className="text-lg" />,
            goodreads: <FaGoodreadsG className="text-lg" />
          }

          return (<Button
            as={Link}
            key={link.vendor}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            startContent={icons[link.vendor] ?? undefined}
            className={classes[link.vendor] ?? ""}
          >
            {link.label}
          </Button>)
        })}
      </div>
    </div>
  )
}
