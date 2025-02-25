import { AnimatedSection } from "./animated-section"

export function Welcome() {
  return (
    <AnimatedSection className="flex flex-col items-center gap-2">
      <h1 className="font-bold text-4xl text-center">Hi!</h1>
      <h2 className="text-4xl text-center">
        I'm Matt, and I like to write things.
      </h2>
    </AnimatedSection>
  )
}
