"use client"

import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  className?: string
  animate?: boolean
  children: React.ReactNode
  id?: string
}

export function AnimatedSection({
  className,
  animate = true,
  children,
  id,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const pathname = usePathname()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Reset animation state when pathname changes
  useEffect(() => {
    setHasAnimated(false)
  }, [pathname])

  // Track when animation completes
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Disable animations if user prefers reduced motion or animate is false
  const shouldAnimate = animate && !shouldReduceMotion

  return shouldAnimate ? (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  ) : (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
