"use client"

import { BooksDropdownButton } from "@/app/components/books-dropdown-button"
import { siteConfig } from "@/lib/config/site"
import { Divider } from "@/components/ui/divider"
import type { NavSection } from "@/lib/config/navigation"
import Image from "next/image"
import Link from "next/link"
import { Disclosure } from "@headlessui/react"

interface SiteNavbarProps {
  booksNav: NavSection[]
}

export function SiteNavbar({ booksNav }: SiteNavbarProps) {
  return (
    <Disclosure as="nav" aria-label="Main navigation">
      {({ open }) => (
        <>
          <div className="sticky top-0 z-50 w-full h-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
              {/* Mobile menu button */}
              <div className="flex items-center gap-4">
                <Disclosure.Button className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800">
                  <span className="sr-only">
                    {open ? "Close menu" : "Open menu"}
                  </span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Disclosure.Button>

                {/* Desktop brand */}
                <div className="h-full py-2 hidden sm:flex gap-2 items-center">
                  <Image
                    src={siteConfig.images.profilePicture}
                    alt={`${siteConfig.author.name} profile picture`}
                    width={50}
                    height={50}
                    className="h-12 w-auto overflow-hidden rounded-full"
                    priority
                  />
                  <span className="font-bold text-lg">{siteConfig.name}</span>
                </div>
              </div>

              {/* Mobile brand (center) */}
              <div className="h-full py-2 sm:hidden flex gap-2 items-center">
                <div className="w-fit h-fit overflow-hidden rounded-full">
                  <Image
                    src={siteConfig.images.profilePicture}
                    alt={`${siteConfig.author.name} profile picture`}
                    width={50}
                    height={50}
                    className="h-12 m-auto object-scale-down"
                    priority
                  />
                </div>
                <span className="font-bold text-lg">{siteConfig.name}</span>
              </div>

              {/* Desktop navigation */}
              <div className="hidden sm:flex items-center gap-8">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  Contact
                </Link>
                <BooksDropdownButton booksNav={booksNav} />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden border-b bg-white/95 backdrop-blur dark:bg-gray-950/95">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Contact
              </Disclosure.Button>

              <Divider className="my-2" />

              <div role="group" aria-labelledby="books-heading">
                <h2 id="books-heading" className="px-3 py-2 text-sm font-bold">
                  Books
                </h2>

                {booksNav.map((section) => (
                  <div key={section.title}>
                    <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2">
                      {section.title}
                    </h3>
                    {section.items.map((item) => (
                      <Disclosure.Button
                        key={item.href}
                        as={Link}
                        href={item.href}
                        className="block rounded-md px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {item.label}
                      </Disclosure.Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
