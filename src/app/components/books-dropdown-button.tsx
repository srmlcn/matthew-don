"use client"

import { BOOK_CATEGORIES, books } from "@/lib/book-data"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from "@heroui/react"
import { useState } from "react"

export function BooksDropdownButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
          endContent={
            <ChevronDownIcon
              height="16px"
              className={`transform-all duration-150 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          }
        >
          Books
        </Button>
      </DropdownTrigger>
      <DropdownMenu classNames={{ base: "max-w-96" }}>
        <DropdownSection
          title="The Adventures of Luca and Kai"
          items={books.filter(
            (book) =>
              book.linkData.internal &&
              book.category === BOOK_CATEGORIES.ADVENTURES
          )}
        >
          {(item) => (
            <DropdownItem key={item.title}>
              <Link href={item.linkData.internal!.href}>
                <p className="-indent-2 pl-2 text-balance">{item.title}</p>
              </Link>
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection
          title="Others"
          items={books.filter(
            (book) =>
              book.linkData.internal && book.category === BOOK_CATEGORIES.OTHERS
          )}
        >
          {(item) => (
            <DropdownItem key={item.title}>
              <Link href={item.linkData.internal?.href || "#"}>
                <p className="-indent-2 pl-2 text-balance">{item.title}</p>
              </Link>
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
