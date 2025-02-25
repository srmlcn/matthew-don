"use client"

import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-4xl">Like I said, I'm Matt.</h1>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 py-12 items-start place-items-center">
        <Image
          src="/matthew-don.jpg"
          alt="Matthew Don"
          width={724}
          height={763}
          className="w-full h-auto"
        />
        <div className="flex flex-col gap-4">
          <p>
            That's me. Ok, the picture is over a decade old. I'm bald now. I'm
            not trying to catfish you or anything, so chill. This is an author
            bio, not a dating app. I also go by Matthew, if you'd prefer. Some
            people call me Mo or Pete (just some old nicknames, long story).
          </p>

          <p>
            My full name is Matthew Don. I was born and raised in Tucson,
            Arizona, and, outside of a few years in New Jersey and Texas, have
            lived in the Old Pueblo my entire life. In the real world, I'm just
            a working stiff who has held a wide variety of jobs, including a 7
            year stint as a flight attendant and a 2 day stint at a bowling
            alley. I enjoy trying out different hobbies and spending time with
            my family, like my two nephews named Luca and Kai!
          </p>

          <p>
            Like most writers, I started writing to impress a girl. It didn't
            work, but at least I found a hobby I enjoy. My first book, A
            Celebration of the History of Celebrating History, was published in
            2015. After a long hiatus, my brother, Chris, wanted me to work with
            him on a story for his two children. Thus, The Adventures of Luca
            and Kai was born.
          </p>

          <p>
            Anywhoooo, feel free to message me on Instagram or TikTok with any
            questions or concerns, or if you just want to say hi!
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
      </section>
    </div>
  )
}
