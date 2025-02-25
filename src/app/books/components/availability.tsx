import { AnimatedSection } from "@/app/components/animated-section"
import DOMPurify from "isomorphic-dompurify"

export function Availability({ availability }: { availability: string }) {
  return (
    <AnimatedSection className="flex flex-col items-center gap-4">
      <p className="text-center">{DOMPurify.sanitize(availability)}</p>
    </AnimatedSection>
  )
}
