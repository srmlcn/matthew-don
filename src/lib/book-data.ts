import type { ImageData } from "./image-data"
import type { LinkData } from "./link-data"

export type BookData = {
  title: string
  descriptions: string[]
  imageData: ImageData
  linkData: LinkData
}
