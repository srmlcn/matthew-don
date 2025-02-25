"use client"

import { motion } from "framer-motion"

export function AnimatedSection({
  className,
  animate = true,
  children,
}: {
  className?: string
  animate?: boolean
  children: React.ReactNode
}) {
  return animate ? (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  ) : (
    <section className={className}>{children}</section>
  )
}
