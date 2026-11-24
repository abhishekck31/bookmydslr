"use client"

import * as React from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import type { Category, Product } from "@/types"
import { cn } from "@/lib/utils"
import { formatINR, getPricing } from "@/lib/film"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Arrow, EmptyState, FilmButton, FrameLabel } from "./primitives"
import { FilmProductCard } from "./product-card"

const PAGE_SIZE = 24

type SortKey = "recommended" | "price-asc" | "price-desc"
const SORTS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
]

type Filters = {
  category: string | null
  brands: string[]
  price: [number, number]
  availableOnly: boolean
}

export interface ProductBrowserProps {
  products: Product[]
  categories: Category[]
  title: string
  titleEmphasis?: string
  intro?: string
  /** On a category page, the category list links to other categories instead of filtering. */
  currentCategorySlug?: string
  breadcrumb?: { href: string; label: string }[]
}

/* ---------------------------------------------------------------- */

function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-border">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span className="label-mono text-foreground">{title}</span>
        <span aria-hidden className="font-mono text-primary transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  )
}

function CheckRow({
  checked,
  onChange,
  label,
  count,
  type = "checkbox",
  name,
}: {
  checked: boolean
  onChange: () => void
  label: string
  count?: number
  type?: "checkbox" | "radio"
  name?: string
}) {
  return (
    <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm text-body hover:text-foreground">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
      />
      <span className="flex-1 leading-snug">{label}</span>
      {count !== undefined ? <span className="label-mono text-muted-foreground">{count}</span> : null}
    </label>
  )
}

function FiltersPanel({
  products,
  categories,
  filters,
  setFilters,
  maxPrice,
  currentCategorySlug,
}: {
  products: Product[]
  categories: Category[]
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  maxPrice: number
  currentCategorySlug?: string
}) {
  const [showAllBrands, setShowAllBrands] = React.useState(false)

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((p) => {
      if (p.category?.slug) counts[p.category.slug] = (counts[p.category.slug] ?? 0) + 1
    })
    return counts
  }, [products])

  const brandCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((p) => {
      if (p.brand) counts[p.brand] = (counts[p.brand] ?? 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [products])

  const visibleCategories = currentCategorySlug ? categories : categories.filter((c) => categoryCounts[c.slug])
  const brands = showAllBrands ? brandCounts : brandCounts.slice(0, 8)

  return (
    <div className="border-t border-border">
      <FilterGroup title="Category">
        {currentCategorySlug ? (
          <ul className="space-y-0.5">
            <li>
              <Link href="/rental-equipment" className="flex min-h-[40px] items-center text-sm text-body hover:text-primary">
                ← All gear
              </Link>
            </li>
            {visibleCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/rental-equipment/${c.slug}`}
                  aria-current={c.slug === currentCategorySlug ? "page" : undefined}
                  className={cn(
                    "flex min-h-[40px] items-center text-sm leading-snug hover:text-primary",
                    c.slug === currentCategorySlug ? "text-primary" : "text-body",
                  )}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div role="radiogroup" aria-label="Category">
            <CheckRow
              type="radio"
              name="category"
              checked={filters.category === null}
              onChange={() => setFilters((f) => ({ ...f, category: null }))}
              label="All categories"
              count={products.length}
            />
            {visibleCategories.map((c) => (
              <CheckRow
                key={c.slug}
                type="radio"
                name="category"
                checked={filters.category === c.slug}
                onChange={() => setFilters((f) => ({ ...f, category: c.slug }))}
                label={c.name}
                count={categoryCounts[c.slug] ?? 0}
              />
            ))}
          </div>
        )}
      </FilterGroup>

      {brandCounts.length > 1 ? (
        <FilterGroup title="Brand">
          {brands.map(([brand, count]) => (
            <CheckRow
              key={brand}
              checked={filters.brands.includes(brand)}
              onChange={() =>
                setFilters((f) => ({
                  ...f,
                  brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
                }))
              }
              label={brand}
              count={count}
            />
          ))}
          {brandCounts.length > 8 ? (
            <button
              type="button"
              onClick={() => setShowAllBrands((v) => !v)}
              className="mt-1 min-h-[40px] text-sm text-primary hover:underline"
            >
              {showAllBrands ? "Show fewer" : `Show all ${brandCounts.length}`}
            </button>
          ) : null}
        </FilterGroup>
      ) : null}

      <FilterGroup title="Price / day">
        <div className="px-1 pt-3">
          <Slider
            min={0}
            max={maxPrice}
            step={50}
            value={filters.price}
            onValueChange={(v) => setFilters((f) => ({ ...f, price: [v[0], v[1]] as [number, number] }))}
            aria-label="Price per day range"
          />
          <div className="label-mono mt-4 flex justify-between text-muted-foreground">
            <span>{formatINR(filters.price[0])}</span>
            <span>{formatINR(filters.price[1])}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 text-sm text-body">
          Available now only
          <Switch
            checked={filters.availableOnly}
            onCheckedChange={(v) => setFilters((f) => ({ ...f, availableOnly: v }))}
          />
        </label>
      </FilterGroup>
    </div>
  )
}

/* ---------------------------------------------------------------- */

export function ProductBrowser({
  products,
  categories,
  title,
  titleEmphasis,
  intro,
  currentCategorySlug,
  breadcrumb,
}: ProductBrowserProps) {
  const maxPrice = React.useMemo(() => {
    const top = Math.max(0, ...products.map((p) => getPricing(p).price))
    return Math.max(500, Math.ceil(top / 500) * 500)
  }, [products])

  const initialFilters = React.useCallback(
    (): Filters => ({ category: null, brands: [], price: [0, maxPrice], availableOnly: false }),
    [maxPrice],
  )

  const [query, setQuery] = React.useState("")
  const [debounced, setDebounced] = React.useState("")
  const [sort, setSort] = React.useState<SortKey>("recommended")
  const [filters, setFilters] = React.useState<Filters>(initialFilters)
  const [visible, setVisible] = React.useState(PAGE_SIZE)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  // Pick up ?q= from the header search.
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q")
    if (q) {
      setQuery(q)
      setDebounced(q)
    }
  }, [])

  React.useEffect(() => {
    setFilters((f) => ({ ...f, price: [f.price[0], Math.max(f.price[1], maxPrice)] }))
  }, [maxPrice])

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 200)
    return () => clearTimeout(t)
  }, [query])

  React.useEffect(() => setVisible(PAGE_SIZE), [debounced, sort, filters])

  const results = React.useMemo(() => {
    const q = debounced.toLowerCase()
    const list = products.filter((p) => {
      const price = getPricing(p).price
      if (q && !`${p.name} ${p.brand} ${p.category?.name ?? ""}`.toLowerCase().includes(q)) return false
      if (filters.category && p.category?.slug !== filters.category) return false
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false
      if (price < filters.price[0] || price > filters.price[1]) return false
      if (filters.availableOnly && !p.isAvailable) return false
      return true
    })
    const byPrice = (a: Product, b: Product) => getPricing(a).price - getPricing(b).price
    if (sort === "price-asc") list.sort(byPrice)
    else if (sort === "price-desc") list.sort((a, b) => byPrice(b, a))
    else list.sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable))
    return list
  }, [products, debounced, filters, sort])

  const chips: { key: string; label: string; clear: () => void }[] = []
  if (debounced) chips.push({ key: "q", label: `“${debounced}”`, clear: () => setQuery("") })
  if (filters.category) {
    const name = categories.find((c) => c.slug === filters.category)?.name ?? filters.category
    chips.push({ key: "cat", label: name, clear: () => setFilters((f) => ({ ...f, category: null })) })
  }
  filters.brands.forEach((b) =>
    chips.push({ key: `b-${b}`, label: b, clear: () => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })) }),
  )
  if (filters.price[0] > 0 || filters.price[1] < maxPrice)
    chips.push({
      key: "price",
      label: `${formatINR(filters.price[0])} – ${formatINR(filters.price[1])}`,
      clear: () => setFilters((f) => ({ ...f, price: [0, maxPrice] })),
    })
  if (filters.availableOnly)
    chips.push({ key: "avail", label: "Available now", clear: () => setFilters((f) => ({ ...f, availableOnly: false })) })

  const clearAll = () => {
    setQuery("")
    setFilters(initialFilters())
  }

  const activeFilterCount = chips.filter((c) => c.key !== "q").length
  const panel = (
    <FiltersPanel
      products={products}
      categories={categories}
      filters={filters}
      setFilters={setFilters}
      maxPrice={maxPrice}
      currentCategorySlug={currentCategorySlug}
    />
  )

  const emphasisParts = titleEmphasis && title.includes(titleEmphasis) ? title.split(titleEmphasis) : null

  return (
    <div>
      {/* Heading */}
      <section className="border-b border-border">
        <div className="film-container grid gap-6 py-10 md:py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div>
            <FrameLabel n={1} />
            {breadcrumb?.length ? (
              <nav aria-label="Breadcrumb" className="mt-3">
                <ol className="label-mono flex flex-wrap gap-x-2 text-muted-foreground">
                  {breadcrumb.map((b, i) => (
                    <li key={b.href} className="flex gap-2">
                      {i > 0 ? <span aria-hidden>/</span> : null}
                      <Link href={b.href} className="hover:text-foreground">
                        {b.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
          <div>
            <h1 className="font-serif text-display-l text-foreground">
              {emphasisParts ? (
                <>
                  {emphasisParts[0]}
                  <em className="text-primary">{titleEmphasis}</em>
                  {emphasisParts.slice(1).join(titleEmphasis)}
                </>
              ) : (
                title
              )}
            </h1>
            {intro ? <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body md:text-[17px]">{intro}</p> : null}
          </div>
        </div>
      </section>

      <div className="film-container grid gap-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:py-10">
        {/* Desktop sidebar */}
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="scrollbar-thin sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-2">
            {panel}
          </div>
        </aside>

        <div className="min-w-0">
          {/* Top bar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <label htmlFor="browse-search" className="sr-only">
                Search gear
              </label>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="browse-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, brand or category"
                className="h-12 w-full rounded-full border border-border-strong bg-transparent pl-10 pr-10 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-foreground lg:hidden"
                  >
                    Filters
                    {activeFilterCount ? <span className="font-mono text-primary">{String(activeFilterCount).padStart(2, "0")}</span> : null}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="flex max-h-[88dvh] flex-col gap-0 border-border bg-background p-0">
                  <div className="flex items-center justify-between border-b border-border px-4 py-4 pr-14">
                    <SheetTitle className="font-serif text-2xl font-normal text-foreground">Filters</SheetTitle>
                    <button type="button" onClick={clearAll} className="text-sm text-primary">
                      Reset
                    </button>
                  </div>
                  <SheetDescription className="sr-only">Narrow down the gear list</SheetDescription>
                  <div className="flex-1 overflow-y-auto px-4">{panel}</div>
                  <div className="pb-safe border-t border-border px-4 pt-3">
                    <FilmButton className="w-full" onClick={() => setSheetOpen(false)}>
                      Apply <span className="font-mono">({results.length})</span>
                    </FilmButton>
                  </div>
                </SheetContent>
              </Sheet>

              <label htmlFor="browse-sort" className="sr-only">
                Sort
              </label>
              <select
                id="browse-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-12 flex-1 rounded-full border border-border-strong bg-background px-5 text-sm font-medium text-foreground focus:border-primary focus:outline-none md:flex-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="label-mono mr-2 text-muted-foreground" aria-live="polite">
              {results.length} {results.length === 1 ? "frame" : "frames"}
            </p>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background"
                aria-label={`Remove filter ${chip.label}`}
              >
                {chip.label} <X aria-hidden className="h-3.5 w-3.5" />
              </button>
            ))}
            {chips.length > 1 ? (
              <button type="button" onClick={clearAll} className="h-11 px-2 text-sm text-primary hover:underline">
                Clear all
              </button>
            ) : null}
          </div>

          <div className="mt-6">
            {results.length === 0 ? (
              <EmptyState
                description="No gear matches these filters. Try a different search, or widen the price range."
                action={
                  <FilmButton onClick={clearAll}>
                    Reset filters <Arrow />
                  </FilmButton>
                }
              />
            ) : (
              <>
                <div className="contact-sheet grid-cols-2 xl:grid-cols-3">
                  {results.slice(0, visible).map((product) => (
                    <FilmProductCard key={product.id} product={product} />
                  ))}
                </div>
                {visible < results.length ? (
                  <div className="mt-10 flex flex-col items-center gap-3">
                    <p className="label-mono text-muted-foreground">
                      Showing {Math.min(visible, results.length)} of {results.length}
                    </p>
                    <FilmButton variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      Load more
                    </FilmButton>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
