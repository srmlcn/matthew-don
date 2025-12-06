import { AnimatedSection } from "@/app/components/animated-section"

export function Availability({ availability }: { availability: string }) {
  return (
    <AnimatedSection className="flex flex-col items-center gap-4">
      <p className="text-center">{availability}</p>
    </AnimatedSection>
  )
}
