"use client"

import { Button } from "@heroui/react"
import Link from "next/link"

export function Invitation() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-bold text-4xl">{"Wanna know a little about me?"}</p>
      <Button as={Link} href="/about" color="primary" className="text-xl h-12">
        {"I dunno, maybe click this button here then."}
      </Button>
    </div>
  )
}
