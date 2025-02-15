"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import type { ImageData } from "@/lib/image-data"

export function Carousel({ images }: { images: ImageData[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)

  const measureContainerWidth = () => {
    const width = containerRef.current?.offsetWidth ?? 0
    setContainerWidth(width)
    return width
  }

  // Compute effective drag offset with increasing resistance when out-of-bounds.
  const getEffectiveDragOffset = (raw: number) => {
    const k = 0.02 // Adjust for more or less resistance
    if (!containerWidth) return raw

    // Logarithmic resistance (soft, natural feel).
    if (
      (currentIndex === 0 && raw > 0) ||
      (currentIndex === images.length - 1 && raw < 0)
    ) {
      return Math.sign(raw) * (Math.log(1 + k * Math.abs(raw)) / k)
    }

    return raw
  }

  const effectiveDrag = getEffectiveDragOffset(dragOffset)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    measureContainerWidth()
    touchStartX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX
    setDragOffset(currentX - touchStartX.current)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (containerWidth && Math.abs(effectiveDrag) > containerWidth / 2) {
      if (effectiveDrag > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (effectiveDrag < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
    setDragOffset(0)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      if (!containerWidth && containerRef.current) measureContainerWidth()
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      if (!containerWidth && containerRef.current) measureContainerWidth()
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[32rem]">
      <div
        className="relative w-full overflow-hidden"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex ${!isDragging ? 'transition-transform duration-300 ease-out' : ''}`}
          style={{
            transform: `translateX(${-currentIndex * containerWidth + effectiveDrag}px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map(({ src, alt, width, height }, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-cover w-full"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute z-10 top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className={`absolute z-10 top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          Next
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
