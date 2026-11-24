"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { Minus, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { formatShortDate, fromISODate, toISODate } from "@/lib/film"

export const MAX_RENTAL_DAYS = 60

export function DaysStepper({
  value,
  onChange,
  label = "Rental days",
  size = "md",
  className,
}: {
  value: number
  onChange: (days: number) => void
  label?: string
  size?: "sm" | "md"
  className?: string
}) {
  const btn = cn(
    "flex shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-primary disabled:opacity-40",
    size === "sm" ? "h-11 w-11" : "h-12 w-12",
  )
  return (
    <div className={cn("inline-flex items-center gap-2", className)} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label="One day fewer">
        <Minus className="h-4 w-4" />
      </button>
      <output aria-live="polite" className="price min-w-[4.5rem] text-center text-lg text-foreground">
        {value} {value === 1 ? "day" : "days"}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(MAX_RENTAL_DAYS, value + 1))}
        disabled={value >= MAX_RENTAL_DAYS}
        aria-label="One day more"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

/** Pickup → return date range in a popover calendar. */
export function RentalRangePicker({
  start,
  end,
  onChange,
  className,
}: {
  start: string
  end: string
  onChange: (range: { start: string; end: string }) => void
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<DateRange | undefined>()
  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setDraft({ from: fromISODate(start), to: fromISODate(end) })
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "grid h-auto w-full grid-cols-2 border border-border-strong text-left transition-colors hover:border-primary",
            className,
          )}
          aria-label={`Rental dates: pickup ${formatShortDate(start)}, return ${formatShortDate(end)}. Change dates`}
        >
          <span className="border-r border-border-strong px-4 py-3">
            <span className="label-mono block text-muted-foreground">Pickup</span>
            <span className="mt-1 block text-[15px] text-foreground">{formatShortDate(start)}</span>
          </span>
          <span className="px-4 py-3">
            <span className="label-mono block text-muted-foreground">Return</span>
            <span className="mt-1 block text-[15px] text-foreground">{formatShortDate(end)}</span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto rounded-none border-border-strong bg-surface p-0">
        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={draft}
          defaultMonth={draft?.from}
          disabled={{ before: today }}
          onSelect={(range) => {
            setDraft(range)
            if (range?.from && range?.to && range.to > range.from) {
              onChange({ start: toISODate(range.from), end: toISODate(range.to) })
              setOpen(false)
            }
          }}
          classNames={{
            head_cell: "w-11 text-[0.75rem] font-normal text-muted-foreground",
            cell: "relative h-11 w-11 p-0 text-center text-sm focus-within:z-20 [&:has([aria-selected])]:bg-surface-2",
            day: "h-11 w-11 rounded-full p-0 font-normal text-foreground hover:bg-surface-2 aria-selected:opacity-100",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary focus:bg-primary",
            day_range_middle: "aria-selected:bg-surface-2 aria-selected:text-foreground rounded-none",
            day_today: "underline decoration-primary underline-offset-4",
            caption_label: "font-serif text-lg",
          }}
        />
        <p className="label-mono border-t border-border px-4 py-3 text-muted-foreground">Pick pickup, then return date</p>
      </PopoverContent>
    </Popover>
  )
}
