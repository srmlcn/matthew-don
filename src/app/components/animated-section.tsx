"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

export function AnimatedSection({
  className,
  animate = true,
  children,
}: {
  className?: string
  animate?: boolean
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  
  // Disable animations if user prefers reduced motion or animate is false
  const shouldAnimate = animate && !shouldReduceMotion
  
  return shouldAnimate ? (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  ) : (
    <section className={className}>{children}</section>
  )
}
