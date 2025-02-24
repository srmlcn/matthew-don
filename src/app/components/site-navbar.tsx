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
  Divider,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      height="4rem"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ base: "bg-white/40" }}
    >
      <NavbarContent justify="start" className="flex gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="h-full py-2 hidden sm:flex gap-2 justify-start">
          <Image
            src="/profile-picture.png"
            alt="MoPete"
            width={50}
            height={50}
            className="h-full w-auto overflow-hidden rounded-full"
          />
          <p className="font-bold text-lg">Matthew Don</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="flex gap-4">
        <NavbarBrand className="h-full py-2 sm:hidden flex gap-2 justify-end">
          <div className="w-fit h-fit overflow-hidden rounded-full">
            <Image
              src="/profile-picture.png"
              alt="MoPete"
              width={50}
              height={50}
              className="h-full w-auto"
            />
          </div>
          <p className="font-bold text-lg">Matthew Don</p>
        </NavbarBrand>
        <NavbarItem className="hidden sm:flex">
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="/about">About</Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="/contact">Contact</Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
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

      <NavbarMenu className="bg-white/40">
        <NavbarMenuItem key="home">
          <Link onClick={() => setIsMenuOpen(false)} href="/">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="about">
          <Link onClick={() => setIsMenuOpen(false)} href="/about">
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="contact">
          <Link onClick={() => setIsMenuOpen(false)} href="/contact">
            Contact
          </Link>
        </NavbarMenuItem>

        <Divider className="mt-4" />

        <p className="text-sm font-bold">Books</p>

        <NavbarMenuItem key="the-adventures-of-luca-and-kai-the-moon-queen">
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/books/the-adventures-of-luca-and-kai-the-moon-queen"
          >
            The Adventures of Luca and Kai: The Moon Queen
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="a-celebration-of-the-history-of-celebrating-history">
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/books/a-celebration-of-the-history-of-celebrating-history"
          >
            A Celebration of the History of Celebrating History
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
