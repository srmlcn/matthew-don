"use client"

import { BooksDropdownButton } from "@/app/components/books-dropdown-button"
import { adventureBooks, comedyBooks } from "@/lib/data/books"
import { siteConfig } from "@/lib/config/site"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Divider,
} from "@heroui/react"
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
      as="nav"
      aria-label="Main navigation"
    >
      <NavbarContent justify="start" className="flex gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="h-full py-2 hidden sm:flex gap-2 justify-start">
          <Image
            src={siteConfig.images.profilePicture}
            alt={`${siteConfig.author.name} profile picture`}
            width={50}
            height={50}
            className="h-full w-auto overflow-hidden rounded-full"
            priority
          />
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="flex gap-4">
        <NavbarBrand className="h-full py-2 sm:hidden flex gap-2 justify-end">
          <div className="w-fit h-fit overflow-hidden rounded-full">
            <Image
              src={siteConfig.images.profilePicture}
              alt={`${siteConfig.author.name} profile picture`}
              width={50}
              height={50}
              className="h-full m-auto object-scale-down"
              priority
            />
          </div>
          <span className="font-bold text-lg">{siteConfig.name}</span>
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

      <NavbarMenu className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
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

        <div role="group" aria-labelledby="books-heading">
          <h2 id="books-heading" className="text-sm font-bold">
            Books
          </h2>

          <div className="mt-2" />

          <h3 className="text-sm font-semibold light:text-zinc-500 dark:text-zinc-300">
            The Adventures of Luca and Kai
          </h3>
          <FilteredMenuItems
            books={adventureBooks}
            onSelect={() => setIsMenuOpen(false)}
          />

          <div className="mt-2" />

          <h3 className="text-sm font-semibold light:text-zinc-500 dark:text-zinc-300">
            Other Books
          </h3>
          <FilteredMenuItems
            books={comedyBooks}
            onSelect={() => setIsMenuOpen(false)}
          />
        </div>
      </NavbarMenu>
    </Navbar>
  )
}

function FilteredMenuItems({
  books,
  onSelect,
}: {
  books: Array<{
    title: string
    subtitle?: string
    links: { internal?: string }
  }>
  onSelect: () => void
}) {
  return (
    <>
      {books
        .filter((book) => book.links.internal)
        .map((book) => (
          <NavbarMenuItem key={book.title} className="px-1">
            <Link
              onClick={() => onSelect()}
              href={book.links.internal || "#"}
              className="-indent-4 pl-4 block"
            >
              {book.subtitle ? `${book.title}: ${book.subtitle}` : book.title}
            </Link>
          </NavbarMenuItem>
        ))}
    </>
  )
}
