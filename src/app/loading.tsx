import { Divider } from "@heroui/react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center py-20 gap-20 animate-pulse">
      {/* Welcome Section */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-32 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-10 w-96 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>

      <Divider orientation="horizontal" />

      {/* Featured Book Section */}
      <div className="flex flex-col items-center gap-12">
        <div className="h-10 w-64 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-96 w-64 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>

      <Divider orientation="horizontal" />

      {/* Books Grid */}
      <div className="flex flex-col items-center gap-12">
        <div className="h-10 w-80 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="h-80 w-56 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <div className="h-6 w-48 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-40 bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
