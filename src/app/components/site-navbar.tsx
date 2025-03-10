"use client"

import { BooksDropdownButton } from "@/app/components/books-dropdown-button"
import { books } from "@/lib/book-data"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar"
import { Divider } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      height="4rem"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ base: "bg-white/40 dark:bg-black/40" }}
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
              className="h-full m-auto object-scale-down"
            />
          </div>
          <p className="font-bold text-lg">Matthew Don</p>
        </NavbarBrand>
        <div className="flex items-center gap-8">
          <NavbarItem className="hidden sm:flex">
            <Link href="/">Home</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link href="/about">About</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link href="/contact">Contact</Link>
          </NavbarItem>
        </div>
        <NavbarItem className="hidden sm:flex">
          <BooksDropdownButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/40 dark:bg-black/40">
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

        <Divider className="mt-2" />

        <h1 className="text-sm font-bold">Books</h1>

        <span />

        <h2 className="text-sm font-semibold text-zinc-500">
          The Adventures of Luca and Kai
        </h2>
        <FilteredMenuItems
          filter="adventures"
          onSelect={() => setIsMenuOpen(false)}
        />

        <span />

        <h2 className="text-sm font-semibold text-zinc-500">Others</h2>
        <FilteredMenuItems
          filter="others"
          onSelect={() => setIsMenuOpen(false)}
        />
      </NavbarMenu>
    </Navbar>
  )
}

function FilteredMenuItems({
  filter,
  onSelect,
}: {
  filter: string
  onSelect: Function
}) {
  return (
    <>
      {books
        .filter((book) => book.linkData.internal && book.category === filter)
        .map((book) => (
          <NavbarMenuItem key={book.title} className="px-1">
            <Link
              onClick={() => onSelect()}
              href={book.linkData.internal!.href}
            >
              <p className="-indent-4 pl-4">{book.title}</p>
            </Link>
          </NavbarMenuItem>
        ))}
    </>
  )
}
