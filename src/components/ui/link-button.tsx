/**
 * LinkButton Component
 *
 * A Link component styled as a Button
 */

import * as React from "react"
import Link from "next/link"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils/cn"

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    )
  }
)
LinkButton.displayName = "LinkButton"

export { LinkButton }
