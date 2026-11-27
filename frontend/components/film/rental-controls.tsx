"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { Minus, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { formatShortDate, fromISODate, toISODate } from "@/lib/film"

export const MAX_RENTAL_DAYS = 60

/** Hourly pickup / return slots offered to customers. */
export const RENTAL_TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
export const DEFAULT_RENTAL_TIME = "10:00"

/**
 * Billing is per 24 hours from the pickup time. Returning any time after the pickup
 * time-of-day (even a minute late) starts another 24-hour block.
 */
export function billableDays(calendarDays: number, pickupTime: string, returnTime: string) {
  return Math.max(1, calendarDays + (returnTime > pickupTime ? 1 : 0))
}

/** "14:00" → "2:00 PM" */
export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number)
  if (Number.isNaN(h)) return t
  const suffix = h >= 12 ? "PM" : "AM"
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${suffix}`
}

/** Pickup + return time selects, laid out to match RentalRangePicker's two columns. */
export function RentalTimePicker({
  pickupTime,
  returnTime,
  onChange,
  idPrefix = "rental",
  className,
}: {
  pickupTime: string
  returnTime: string
  onChange: (times: { pickupTime: string; returnTime: string }) => void
  idPrefix?: string
  className?: string
}) {
  const select =
    "h-12 w-full border border-border-strong bg-background px-4 text-[15px] text-foreground focus:border-primary focus:outline-none"
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <div>
        <label htmlFor={`${idPrefix}-pickup-time`} className="label-mono mb-2 block text-muted-foreground">
          Pickup time
        </label>
        <select
          id={`${idPrefix}-pickup-time`}
          value={pickupTime}
          // The 24h clock starts at pickup, so the return time moves with it.
          onChange={(e) => onChange({ pickupTime: e.target.value, returnTime: e.target.value })}
          className={select}
        >
          {RENTAL_TIMES.map((t) => (
            <option key={t} value={t}>
              {formatTime(t)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-return-time`} className="label-mono mb-2 block text-muted-foreground">
          Return time
        </label>
        <select
          id={`${idPrefix}-return-time`}
          value={returnTime}
          onChange={(e) => onChange({ pickupTime, returnTime: e.target.value })}
          className={select}
        >
          {RENTAL_TIMES.map((t) => (
            <option key={t} value={t}>
              {formatTime(t)}
            </option>
          ))}
        </select>
      </div>
      <p className="col-span-2 -mt-2 text-sm text-muted-foreground">
        Your 24-hour day starts at pickup. Return by {formatTime(pickupTime)} on the return date; any later counts as an extra day.
      </p>
    </div>
  )
}

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
