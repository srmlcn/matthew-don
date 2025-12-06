"use client"

import { adventureBooks, comedyBooks } from "@/lib/data/books"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { buttonVariants } from "@/components/ui/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@/components/ui/dropdown"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils/cn"

export function BooksDropdownButton() {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const adventureBooksWithLinks = adventureBooks.filter(
    (book) => book.links.internal
  )
  const comedyBooksWithLinks = comedyBooks.filter((book) => book.links.internal)

  return (
    <Dropdown>
      <DropdownTrigger
        className={cn(buttonVariants({ variant: "ghost" }), "text-base gap-1")}
      >
        Books
        <ChevronDownIcon
          height={16}
          className="transition-transform duration-150"
          aria-hidden="true"
        />
      </DropdownTrigger>
      <DropdownMenu className="w-96">
        <DropdownSection title="The Adventures of Luca and Kai">
          {adventureBooksWithLinks.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => router.push(item.links.internal || "#")}
            >
              <span className="block text-balance">
                {item.subtitle ? `${item.title}: ${item.subtitle}` : item.title}
              </span>
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Other Books">
          {comedyBooksWithLinks.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => router.push(item.links.internal || "#")}
            >
              <span className="block text-balance">{item.title}</span>
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
