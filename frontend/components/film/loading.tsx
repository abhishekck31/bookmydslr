import { ProductSheetSkeleton } from "./product-card"

export function ListingLoading() {
  return (
    <div aria-busy aria-label="Loading">
      <div className="border-b border-border">
        <div className="film-container grid gap-6 py-10 md:py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div className="skeleton h-3 w-20" />
          <div className="space-y-4">
            <div className="skeleton h-12 w-3/4 max-w-xl md:h-16" />
            <div className="skeleton h-4 w-full max-w-lg" />
          </div>
        </div>
      </div>
      <div className="film-container grid gap-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:py-10">
        <div className="hidden space-y-3 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-10" />
          ))}
        </div>
        <div className="space-y-6">
          <div className="skeleton h-12 rounded-full" />
          <ProductSheetSkeleton count={6} className="lg:grid-cols-2 xl:grid-cols-3" />
        </div>
      </div>
    </div>
  )
}

export function DetailLoading() {
  return (
    <div className="film-container grid gap-8 py-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:py-14" aria-busy aria-label="Loading">
      <div className="skeleton aspect-square" />
      <div className="space-y-5">
        <div className="skeleton h-3 w-40" />
        <div className="skeleton h-14 w-4/5" />
        <div className="skeleton h-10 w-48" />
        <div className="skeleton h-32" />
        <div className="skeleton h-14 rounded-full" />
      </div>
    </div>
  )
}
