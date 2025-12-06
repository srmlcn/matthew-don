"use client"

import { useEffect, useState } from "react"
import _Confetti from "@tholman/confetti"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

export function Confetti({
  timeout = 10000,
  ...props
}: { timeout?: number } & any) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, hide confetti immediately
    if (shouldReduceMotion) {
      setIsVisible(false)
      return
    }

    // Start fade out animation before timeout
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(true)
    }, timeout)

    // Unmount after timeout
    const unmountTimer = setTimeout(() => {
      setIsVisible(false)
    }, timeout + 1000)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(unmountTimer)
    }
  }, [timeout, shouldReduceMotion])

  if (!isVisible || shouldReduceMotion) {
    return null
  }

  return (
    <div
      className={`w-full h-full absolute transition-opacity duration-500 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <_Confetti total={props.total ?? undefined} />
    </div>
  )
}
