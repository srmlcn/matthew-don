export default function CatalogLoading() {
  return (
    <div className="flex flex-col items-center gap-24 animate-pulse">
      {/* Book Cover */}
      <div className="h-[48rem] w-80 bg-neutral-300 dark:bg-neutral-700 rounded" />

      {/* Book Info */}
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <div className="h-10 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-6 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-32 w-full bg-neutral-300 dark:bg-neutral-700 rounded mt-4" />
      </div>

      {/* Carousel */}
      <div className="w-full max-w-2xl">
        <div className="h-96 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full max-w-4xl">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-24 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
            <div className="h-6 w-32 bg-neutral-300 dark:bg-neutral-700 rounded" />
            <div className="h-6 w-24 bg-neutral-300 dark:bg-neutral-700 rounded" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <div className="h-10 w-48 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-10 w-48 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>
    </div>
  )
}
