/**
 * Navbar Components
 *
 * Accessible navigation components built with HeadlessUI.
 */

"use client"

import * as React from "react"
import { Disclosure } from "@headlessui/react"
import { cn } from "@/lib/utils/cn"

interface NavbarProps {
  children: React.ReactNode
  className?: string
  height?: string
  as?: React.ElementType
  "aria-label"?: string
  isMenuOpen?: boolean
  onMenuOpenChange?: (isOpen: boolean) => void
}

export function Navbar({
  children,
  className,
  height = "4rem",
  as: Component = "nav",
  "aria-label": ariaLabel,
  ...props
}: NavbarProps) {
  return (
    <Component aria-label={ariaLabel}>
      <div
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60",
          className
        )}
        style={{ height }}
        {...props}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          {children}
        </div>
      </div>
    </Component>
  )
}

export function NavbarBrand({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  )
}

export function NavbarContent({
  children,
  justify = "start",
  className,
}: {
  children: React.ReactNode
  justify?: "start" | "end" | "center"
  className?: string
}) {
  const justifyClass = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
  }[justify]

  return (
    <div className={cn("flex items-center gap-4", justifyClass, className)}>
      {children}
    </div>
  )
}

export function NavbarItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("", className)}>{children}</div>
}

export function NavbarMenuToggle({
  "aria-label": ariaLabel,
  className,
}: {
  "aria-label": string
  className?: string
}) {
  return (
    <Disclosure.Button
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        className
      )}
      aria-label={ariaLabel}
    >
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
  )
}

export function NavbarMenu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Disclosure.Panel className={cn("sm:hidden", className)}>
      <div className="space-y-1 px-2 pb-3 pt-2">{children}</div>
    </Disclosure.Panel>
  )
}

export function NavbarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("block rounded-md px-3 py-2", className)}>
      {children}
    </div>
  )
}
