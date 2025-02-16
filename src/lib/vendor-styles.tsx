import React, { ReactNode } from "react"
import { FaAmazon } from "react-icons/fa"

export function getVendorStyle(vendor: string): { background: string, icon: ReactNode } {
  let background: string
  let icon: ReactNode | undefined

  switch (vendor) {
    case "amazon":
      background = "bg-[#febd69]"
      icon = <FaAmazon className="text-lg" />
      break
    default:
      background = ""
      icon = undefined
  }

  return { background, icon }
}