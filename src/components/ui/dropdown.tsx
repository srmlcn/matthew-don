/**
 * Dropdown Menu Component
 *
 * Accessible dropdown menu built with HeadlessUI.
 */

"use client"

import * as React from "react"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { cn } from "@/lib/utils/cn"

interface DropdownProps {
  children: React.ReactNode
}

export function Dropdown({ children }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {children}
    </Menu>
  )
}

interface DropdownTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function DropdownTrigger({
  children,
  className,
  asChild = false,
}: DropdownTriggerProps) {
  if (asChild) {
    // Clone the child element and merge the Menu.Button props
    const child = React.Children.only(children) as React.ReactElement
    return <Menu.Button as={React.Fragment}>{child}</Menu.Button>
  }
  return <Menu.Button className={className}>{children}</Menu.Button>
}

interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={cn(
          "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:divide-gray-800",
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  )
}

interface DropdownSectionProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function DropdownSection({
  children,
  title,
  className,
}: DropdownSectionProps) {
  return (
    <div className={cn("px-1 py-1", className)}>
      {title && (
        <div className="px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export function DropdownItem({
  children,
  onClick,
  href,
  className,
}: DropdownItemProps) {
  const content = (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={cn(
            active
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              : "text-gray-700 dark:text-gray-300",
            "group flex w-full items-center rounded-md px-2 py-2 text-sm",
            className
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}
