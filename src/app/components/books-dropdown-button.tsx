"use client"

import { adventureBooks, comedyBooks } from "@/lib/data/books"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react"
import { useState } from "react"

export function BooksDropdownButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const adventureBooksWithLinks = adventureBooks.filter(
    (book) => book.links.internal
  )
  const comedyBooksWithLinks = comedyBooks.filter((book) => book.links.internal)

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      placement="bottom-end"
    >
      <DropdownTrigger>
        <Button
          className="text-base"
          variant="light"
          aria-label="Books menu"
          endContent={
            <ChevronDownIcon
              height="16px"
              className={`transform-all duration-150 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          }
        >
          Books
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        classNames={{ base: "max-w-96" }}
        aria-label="Books navigation"
      >
        <DropdownSection
          title="The Adventures of Luca and Kai"
          items={adventureBooksWithLinks}
        >
          {(item) => (
            <DropdownItem key={item.id} href={item.links.internal || "#"}>
              <span className="-indent-2 pl-2 text-balance block">
                {item.subtitle ? `${item.title}: ${item.subtitle}` : item.title}
              </span>
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection title="Other Books" items={comedyBooksWithLinks}>
          {(item) => (
            <DropdownItem key={item.id} href={item.links.internal || "#"}>
              <span className="-indent-2 pl-2 text-balance block">
                {item.title}
              </span>
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
