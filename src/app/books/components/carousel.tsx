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
  const touchStartX = useRef(0)

  const measureContainerWidth = () => {
    const width = containerRef.current?.offsetWidth ?? 0
    setContainerWidth(width)
    return width
  }

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
    // If dragged more than half the width, change slide.
    if (containerWidth && Math.abs(dragOffset) > containerWidth / 2) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (dragOffset < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
    setDragOffset(0)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      if (!containerWidth && containerRef.current) {
        measureContainerWidth()
      }
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      if (!containerWidth && containerRef.current) {
        measureContainerWidth()
      }
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        className={`flex ${
          !isDragging ? "transition-transform duration-300 ease-out" : ""
        }`}
        style={{
          transform: `translateX(${
            -currentIndex * containerWidth + dragOffset
          }px)`,
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
        className="absolute z-10 top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 disabled:opacity-50"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
        className="absolute z-10 top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
