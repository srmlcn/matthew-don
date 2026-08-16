"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

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
  const shouldAnimate = animate && !shouldReduceMotion

  if (!shouldAnimate) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
