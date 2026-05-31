"use client"

import { useRef, useEffect, useState } from "react"
import { Category } from "@/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
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
} from "lucide-react"

interface PremiumCategoryNavProps {
  categories: Category[]
  activeCategory: string | null
  onSelectCategory: (slug: string | null) => void
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

export function PremiumCategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
}: PremiumCategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => {
      setShowLeftFade(el.scrollLeft > 8)
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
    }

    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [categories])

  const pills = [{ id: "all", name: "All Gear", slug: null as string | null }, ...categories]

  return (
    <div className="relative">
      {showLeftFade && (
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#f0f1f8] to-transparent" />
      )}
      {showRightFade && (
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#f0f1f8] to-transparent" />
      )}

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-2 overflow-x-auto px-1 py-1 snap-x snap-mandatory"
      >
        {pills.map((item) => {
          const isAll = item.slug === null
          const isActive = isAll ? activeCategory === null : activeCategory === item.slug
          const Icon = isAll ? LayoutGrid : getCategoryIcon(item.name)

          return (
            <button
              key={item.id ?? "all"}
              type="button"
              onClick={() => onSelectCategory(isActive && !isAll ? null : item.slug)}
              className={cn(
                "relative flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-active-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200/70"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className={cn("relative z-10 h-4 w-4", isActive ? "text-amber-500" : "text-slate-400")} />
              <span className="relative z-10 whitespace-nowrap">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
