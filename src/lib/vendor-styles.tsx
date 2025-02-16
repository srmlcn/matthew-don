import React, { ReactNode } from "react"
import { FaAmazon, FaGoodreadsG } from "react-icons/fa"

export function getVendorStyle(vendor: string): { background: string, icon: ReactNode } {
  let background: string
  let icon: ReactNode | undefined

  switch (vendor) {
    case "amazon":
      background = "bg-[#febd69]"
      icon = <FaAmazon className="text-lg" />
      break
    case "goodreads":
      background = "bg-[#553b08]"
      icon = <FaGoodreadsG className="text-lg" />
      break
    default:
      background = ""
      icon = undefined
  }

  return { background, icon }
}