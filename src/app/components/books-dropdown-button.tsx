"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
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
      <DropdownMenu>
        <DropdownItem key="the-adventures-of-luca-and-kai-the-moon-queen">
          <Link href="/books/the-adventures-of-luca-and-kai-the-moon-queen">
            The Adventures of Luca and Kai: The Moon Queen
          </Link>
        </DropdownItem>
        <DropdownItem key="the-adventures-of-luca-and-kai-the-comics">
          <Link href="/comics/the-adventures-of-luca-and-kai-the-comics">
            The Adventures of Luca and Kai: The Comics
          </Link>
        </DropdownItem>
        <DropdownItem key="a-celebration-of-the-history-of-celebrating-history">
          <Link href="/books/a-celebration-of-the-history-of-celebrating-history">
            A Celebration of the History of Celebrating History
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
