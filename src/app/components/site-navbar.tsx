"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function SiteNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <Navbar height="4rem" classNames={{ base: "bg-white/40" }}>
      <NavbarBrand>
        <Image src="/profile-picture.png" alt="MoPete" width={50} height={50} />
      </NavbarBrand>
      <NavbarContent justify="end" className="space-x-4">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact">Contact</Link>
        </NavbarItem>
        <NavbarItem>
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
              <DropdownItem key="a-celebration-of-the-history-of-celebrating-history">
                <Link href="/books/a-celebration-of-the-history-of-celebrating-history">
                  A Celebration of the History of Celebrating History
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
