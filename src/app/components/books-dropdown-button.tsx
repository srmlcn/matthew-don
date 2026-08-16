"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { buttonVariants } from "@/components/ui/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@/components/ui/dropdown"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import type { NavSection } from "@/lib/config/navigation"

interface BooksDropdownButtonProps {
  booksNav: NavSection[]
}

export function BooksDropdownButton({ booksNav }: BooksDropdownButtonProps) {
  const router = useRouter()

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
        {booksNav.map((section) => (
          <DropdownSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <DropdownItem
                key={item.href}
                onClick={() => router.push(item.href)}
              >
                <span className="block text-balance">{item.label}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
