"use client"

import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export type BookProps = {
  title: string
  descriptions: string[]
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  link: {
    href: string
    label: string
  }
}

export function Book({ title, descriptions, image, link }: BookProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={`max-h-[32rem] w-auto aspect-[${image.width}/${image.height}]`}
      />
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
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </Button>
    </div>
  )
}
