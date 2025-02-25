import DOMPurify from "isomorphic-dompurify"

export function Availability({ availability }: { availability: string }) {
  return (
    <section className="flex flex-col items-center gap-4">
      <p className="text-center">{DOMPurify.sanitize(availability)}</p>
    </section>
  )
}
