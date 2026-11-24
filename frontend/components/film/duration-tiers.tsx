"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DEFAULT_DURATION_TIERS, formatPercent, formatTierRange, tierFor, type DurationTier } from "@/lib/film"

const DurationTiersContext = React.createContext<DurationTier[]>(DEFAULT_DURATION_TIERS)

export function DurationTiersProvider({ tiers, children }: { tiers: DurationTier[]; children: React.ReactNode }) {
  return <DurationTiersContext.Provider value={tiers}>{children}</DurationTiersContext.Provider>
}

export function useDurationTiers(): DurationTier[] {
  return React.useContext(DurationTiersContext)
}

/** "Longer rentals save more" table; highlights the tier the chosen duration falls in. */
export function TierTable({ days, className }: { days?: number; className?: string }) {
  const tiers = useDurationTiers()
  if (!tiers.length) return null
  const active = days ? tierFor(days, tiers) : null

  return (
    <div className={className}>
      <p className="label-mono mb-2 text-muted-foreground">Longer rentals save more</p>
      <ul className="border-t border-border">
        {tiers.map((t) => {
          const on = active === t
          return (
            <li
              key={`${t.minDays}-${t.maxDays ?? "up"}`}
              className={cn(
                "flex items-center justify-between gap-4 border-b border-border px-3 py-2.5 text-[15px]",
                on ? "bg-surface-2 text-foreground" : "text-body",
              )}
              aria-current={on ? "true" : undefined}
            >
              <span>
                {formatTierRange(t)}
                {t.label ? <span className="text-muted-foreground"> · {t.label}</span> : null}
              </span>
              <span className={cn("price", on ? "text-primary" : "text-foreground")}>
                {formatPercent(t.percent)} off{on ? <span className="sr-only"> (your selection)</span> : null}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
