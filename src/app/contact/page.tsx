"use client"

import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-4xl">Wanna get in touch?</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 py-12 items-center place-items-center">
        <Image
          src="/profile-picture.png"
          alt="Profile Picture"
          width={482}
          height={482}
          className="w-full h-auto"
        />
        <div className="flex flex-col gap-4">
          <p>
            Have any questions you'd like to ask me? Would you like to complain
            about a spelling error you found? Just wanna say hi? Are you a
            publisher or movie producer who wants to pay me insane amounts of
            money to buy the rights to my stories? Message me on Instagram or
            TikTok!
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              as={Link}
              href="https://www.instagram.com/hiimmattdon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Button>
            <Button
              as={Link}
              href="https://www.tiktok.com/@hiimmattdon"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
