"use client"

import { Category } from "@/types"
import { cn } from "@/lib/utils"
import {
  Camera,
  Focus,
  Clapperboard,
  Mic,
  Lightbulb,
  Video,
  Battery,
  Zap,
  Settings,
  LayoutGrid,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PremiumCategoryNavProps {
  categories: Category[]
  activeCategory: string | null
  onSelectCategory: (slug: string | null) => void
  categoryCounts?: Record<string, number>
  totalCount?: number
}

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes("dslr") || lower.includes("mirrorless")) return Camera
  if (lower.includes("lens")) return Focus
  if (lower.includes("gimbal")) return Clapperboard
  if (lower.includes("audio") || lower.includes("mic")) return Mic
  if (lower.includes("light")) return Lightbulb
  if (lower.includes("action") || lower.includes("gopro") || lower.includes("drone")) return Video
  if (lower.includes("battery")) return Battery
  if (lower.includes("flash")) return Zap
  return Settings
}

function CategoryTile({
  name,
  slug,
  count,
  isActive,
  onClick,
  icon: Icon,
}: {
  name: string
  slug: string | null
  count?: number
  isActive: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "group flex flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition-all duration-200 sm:p-4",
        "min-h-[88px] touch-manipulation",
        isActive
          ? "border-amber-400 bg-amber-500 text-white shadow-md shadow-amber-500/25"
          : "border-slate-200 bg-white text-slate-700 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
          isActive
            ? "bg-white/20 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="w-full min-w-0">
        <p
          className={cn(
            "line-clamp-2 text-xs font-semibold leading-tight sm:text-sm",
            isActive ? "text-white" : "text-slate-800"
          )}
        >
          {name}
        </p>
        {count !== undefined && (
          <p
            className={cn(
              "mt-0.5 text-[10px] font-medium sm:text-xs",
              isActive ? "text-amber-100" : "text-slate-400"
            )}
          >
            {count} {count === 1 ? "item" : "items"}
          </p>
        )}
      </div>
    </button>
  )
}

export function PremiumCategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
  totalCount,
}: PremiumCategoryNavProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false)

  const pills = [{ id: "all", name: "All Gear", slug: null as string | null }, ...categories]

  const activeName =
    activeCategory === null
      ? "All Gear"
      : categories.find((c) => c.slug === activeCategory)?.name ?? "Category"

  const handleSelect = (slug: string | null) => {
    onSelectCategory(slug)
    setMobileExpanded(false)
  }

  const grid = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {pills.map((item) => {
        const isAll = item.slug === null
        const isActive = isAll ? activeCategory === null : activeCategory === item.slug
        const Icon = isAll ? LayoutGrid : getCategoryIcon(item.name)
        const count = isAll ? totalCount : categoryCounts[item.slug ?? ""]

        return (
          <CategoryTile
            key={item.id ?? "all"}
            name={item.name}
            slug={item.slug}
            count={count}
            isActive={isActive}
            icon={Icon}
            onClick={() => handleSelect(isActive && !isAll ? null : item.slug)}
          />
        )
      })}
    </div>
  )

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
      {/* Mobile: compact summary + expand */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-left ring-1 ring-slate-100"
          aria-expanded={mobileExpanded}
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Category
            </p>
            <p className="text-sm font-bold text-slate-900">{activeName}</p>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-slate-400 transition-transform duration-200",
              mobileExpanded && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3">{grid}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tablet & desktop: always visible grid */}
      <div className="hidden md:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Browse by category
        </p>
        {grid}
      </div>
    </div>
  )
}
