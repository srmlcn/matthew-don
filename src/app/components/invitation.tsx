"use client"

import { Button } from "@heroui/react"
import Link from "next/link"

export function Invitation() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-bold text-4xl text-center">
        {"Wanna know a little about me?"}
      </p>
      <Button
        as={Link}
        href="/about"
        color="primary"
        className="text-xl h-full px-4 py-2 text-wrap w-48 sm:w-fit text-center"
      >
        {"I dunno, maybe click this button here then."}
      </Button>
    </div>
  )
}
