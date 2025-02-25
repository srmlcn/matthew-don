"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import type { ImageData } from "@/lib/image-data"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"

export function Carousel({
  images,
  flickThreshold = 0.5,
}: {
  images: ImageData[]
  flickThreshold?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)

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
    touchStartTime.current = performance.now()
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX
    setDragOffset(currentX - touchStartX.current)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const elapsed = performance.now() - touchStartTime.current
    const velocity = elapsed > 0 ? dragOffset / elapsed : 0 // pixels per milliseconds

    if (Math.abs(velocity) > flickThreshold) {
      // Flick gesture detected: move one slide based on direction.
      if (velocity > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (velocity < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    } else if (containerWidth && Math.abs(effectiveDrag) > containerWidth / 2) {
      // Use drag distance to determine if we should move to the next slide.
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
    <div
      className="mx-auto w-full max-w-[32rem]"
      role="region"
      aria-label="Image carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") handlePrev()
        if (e.key === "ArrowRight") handleNext()
      }}
      tabIndex={0}
    >
      <div
        className="relative w-full overflow-hidden"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex ${
            !isDragging ? "transition-transform duration-300 ease-out" : ""
          }`}
          role="list"
          style={{
            transform: `translateX(${
              -currentIndex * containerWidth + effectiveDrag
            }px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map(({ src, alt, width, height }, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex flex-col items-center"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-full m-auto object-scale-down"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous image"
          className={`absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-black/40 backdrop-blur text-white disabled:text-gray-500 p-2 rounded-full transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ArrowLeftIcon className="w-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          aria-label="Next image"
          className={`absolute z-10 top-1/2 right-4 transform -translate-y-1/2 bg-black/40 backdrop-blur text-white disabled:text-gray-500 p-2 rounded-full transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ArrowRightIcon className="w-6" />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            role="listitem"
            aria-label={`Image ${index + 1} of ${images.length}`}
          />
        ))}
      </div>
    </div>
  )
}
