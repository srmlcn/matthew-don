import { ImageData } from "@/lib/image-data"
import Image from "next/image"

export function CoverImage(imageData: ImageData) {
  return (
    <section className="max-h-[72rem] h-full w-full flex items-center">
      <Image
        src={imageData.src}
        alt={imageData.alt}
        width={imageData.width}
        height={imageData.height}
        className="max-h-[72rem] h-full m-auto object-scale-down"
      />
    </section>
  )
}
