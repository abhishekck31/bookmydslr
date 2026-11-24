"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { useCart, type CartItem } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  addDaysISO,
  daysBetween,
  formatINR,
  formatShortDate,
  formatPercent,
  rentalTotal,
  tierFor,
  tomorrowISO,
  whatsappLink,
} from "@/lib/film"
import { Arrow, EmptyState, FilmButton, FrameLabel, WhatsAppIcon } from "@/components/film/primitives"
import { DaysStepper, RentalRangePicker } from "@/components/film/rental-controls"
import { MobileStickyBar } from "@/components/film/mobile-sticky-bar"
import { TierTable, useDurationTiers } from "@/components/film/duration-tiers"

const DELIVERY_FEE = 200
const TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]

type Customer = { name: string; phone: string; city: string; address: string; pincode: string; notes: string }
type Field = keyof Customer

const fieldCls =
  "h-12 w-full border border-border-strong bg-transparent px-4 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none aria-[invalid=true]:border-danger"

function TextField({
  id,
  label,
  value,
  onChange,
  invalid,
  required,
  ...rest
}: {
  id: Field
  label: string
  value: string
  onChange: (v: string) => void
  invalid?: boolean
  required?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <div>
      <label htmlFor={`c-${id}`} className="label-mono mb-2 block text-muted-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <input
        id={`c-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `c-${id}-err` : undefined}
        required={required}
        className={fieldCls}
        {...rest}
      />
      {invalid ? (
        <p id={`c-${id}-err`} className="mt-1.5 text-sm text-danger">
          Required
        </p>
      ) : null}
    </div>
  )
}

function CartLine({
  item,
  onDays,
  onRemove,
}: {
  item: CartItem
  onDays: (d: number) => void
  onRemove: () => void
}) {
  const tiers = useDurationTiers()
  const total = rentalTotal(item.price, item.days, tiers)
  const tier = tierFor(item.days, tiers)
  const full = item.price * item.days
  return (
    <li className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 bg-background p-4 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center md:gap-6">
      <Link href={`/product/${item.id}`} className="relative block aspect-square bg-tile" tabIndex={-1} aria-hidden>
        <Image src={item.image || "/placeholder.svg"} alt="" fill sizes="120px" className="object-contain p-3" />
      </Link>
      <div className="min-w-0">
        <p className="truncate text-[13px] text-muted-foreground">
          {item.brand ? `${item.brand} · ` : ""}
          {item.category}
        </p>
        <h3 className="mt-1 font-serif text-title text-foreground">
          <Link href={`/product/${item.id}`} className="hover:text-primary">
            {item.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="price text-body">{formatINR(item.price)}</span> / day
          {tier && total < full ? (
            <span className="ml-2 text-success">· {formatPercent(tier.percent)} off for {item.days} days</span>
          ) : null}
        </p>
        <div className="mt-3 md:hidden">
          <DaysStepper value={item.days} onChange={onDays} size="sm" label={`Rental days for ${item.name}`} />
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-between gap-4 border-t border-dashed border-border-strong pt-3 md:col-span-1 md:flex-col md:items-end md:border-0 md:pt-0">
        <div className="hidden md:block">
          <DaysStepper value={item.days} onChange={onDays} size="sm" label={`Rental days for ${item.name}`} />
        </div>
        <p className="flex items-baseline gap-2">
          {total < full ? <s className="price text-sm text-subtle">{formatINR(full)}</s> : null}
          <span className="price text-[22px] text-primary">{formatINR(total)}</span>
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-danger"
          aria-label={`Remove ${item.name} from cart`}
        >
          <X aria-hidden className="h-4 w-4" /> Remove
        </button>
      </div>
    </li>
  )
}

export default function CartPage() {
  const { items, removeItem, updateItemDays, dates, setDates, setAllDays } = useCart()
  const { toast } = useToast()

  const [pickupTime, setPickupTime] = React.useState("10:00")
  const [returnTime, setReturnTime] = React.useState("10:00")
  const [method, setMethod] = React.useState<"pickup" | "delivery">("pickup")
  const [customer, setCustomer] = React.useState<Customer>({ name: "", phone: "", city: "Bangalore", address: "", pincode: "", notes: "" })
  const [errors, setErrors] = React.useState<Partial<Record<Field, boolean>>>({})

  // Shared rental window: from the cart store, else tomorrow → longest item.
  const maxDays = items.reduce((m, i) => Math.max(m, i.days || 1), 1)
  const fallbackStart = tomorrowISO()
  const start = dates && dates.start >= fallbackStart ? dates.start : fallbackStart
  const end = dates && dates.start >= fallbackStart ? dates.end : addDaysISO(fallbackStart, maxDays)

  const setCustomerField = (k: Field) => (v: string) => {
    setCustomer((c) => ({ ...c, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }))
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.days, 0)
  const tiers = useDurationTiers()
  const total = items.reduce((s, i) => s + rentalTotal(i.price, i.days, tiers), 0)
  const saving = subtotal - total
  const deliveryFee = method === "delivery" ? DELIVERY_FEE : 0
  const grandTotal = total + deliveryFee

  const send = () => {
    const required: Field[] = ["name", "phone", "city", ...(method === "delivery" ? (["address", "pincode"] as Field[]) : [])]
    const missing = required.filter((k) => !customer[k].trim())
    if (missing.length) {
      setErrors(Object.fromEntries(missing.map((k) => [k, true])))
      document.getElementById(`c-${missing[0]}`)?.focus()
      toast({ variant: "destructive", title: "Missing details", description: "Fill in the highlighted fields to send your booking." })
      return
    }

    const lines = items
      .map((i, n) => {
        const t = rentalTotal(i.price, i.days, tiers)
        const off = t < i.price * i.days ? tierFor(i.days, tiers)?.percent ?? 0 : 0
        return `${n + 1}. ${i.name}\n   ${formatINR(i.price)}/day × ${i.days} ${i.days === 1 ? "day" : "days"} = ${formatINR(t)}${off ? ` (${formatPercent(off)} duration discount)` : ""}`
      })
      .join("\n")

    const message = `*New booking request — Book My DSLR*

*Customer*
Name: ${customer.name}
Phone: ${customer.phone}
City: ${customer.city}
${method === "delivery" ? `Delivery to: ${customer.address}, ${customer.pincode}` : "Method: Self pickup (Kalyan Nagar)"}

*Schedule*
Pickup: ${formatShortDate(start)} at ${pickupTime}
Return: ${formatShortDate(end)} at ${returnTime}

*Gear*
${lines}

Subtotal: ${formatINR(total)}${deliveryFee ? `\nDelivery: from ${formatINR(deliveryFee)} (depends on distance)` : ""}
*Estimated total: ${formatINR(grandTotal)}*

Notes: ${customer.notes.trim() || "None"}`

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer")
  }

  if (items.length === 0) {
    return (
      <div className="film-container py-14 md:py-24">
        <FrameLabel n={1} />
        <h1 className="mt-3 font-serif text-display-l text-foreground">Your cart</h1>
        <EmptyState
          className="mt-10"
          title={
            <>
              Nothing in <em className="text-primary">frame</em> yet.
            </>
          }
          description="Add cameras, lenses or support gear, then send the whole booking to us on WhatsApp."
          action={
            <FilmButton asChild size="lg">
              <Link href="/rental-equipment">
                Browse gear <Arrow />
              </Link>
            </FilmButton>
          }
        />
      </div>
    )
  }

  return (
    <>
      <div className="film-container py-10 md:py-14">
        <FrameLabel n={1} />
        <h1 className="mt-3 font-serif text-display-l text-foreground">
          Your <em className="text-primary">cart</em>
        </h1>
        <p className="label-mono mt-3 text-muted-foreground">
          {String(items.length).padStart(2, "0")} {items.length === 1 ? "frame" : "frames"}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div className="min-w-0 space-y-12">
            {/* Dates */}
            <section aria-labelledby="dates-heading">
              <h2 id="dates-heading" className="label-mono mb-4 text-muted-foreground">
                Frame 02 — Rental window
              </h2>
              <RentalRangePicker
                start={start}
                end={end}
                onChange={(r) => {
                  setDates(r)
                  setAllDays(daysBetween(r.start, r.end))
                }}
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickup-time" className="label-mono mb-2 block text-muted-foreground">
                    Pickup time
                  </label>
                  <select id="pickup-time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className={cn(fieldCls, "bg-background")}>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="return-time" className="label-mono mb-2 block text-muted-foreground">
                    Return time
                  </label>
                  <select id="return-time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className={cn(fieldCls, "bg-background")}>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Changing the dates sets every item to {daysBetween(start, end)} {daysBetween(start, end) === 1 ? "day" : "days"}. Adjust a single item with its own stepper.
              </p>
            </section>

            {/* Items */}
            <section aria-labelledby="items-heading">
              <h2 id="items-heading" className="label-mono mb-4 text-muted-foreground">
                Frame 03 — Gear
              </h2>
              <ul className="contact-sheet grid-cols-1">
                {items.map((item) => (
                  <CartLine
                    key={item.id}
                    item={item}
                    onDays={(d) => updateItemDays(item.id, d)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </ul>
            </section>

            {/* Customer */}
            <section aria-labelledby="details-heading">
              <h2 id="details-heading" className="label-mono mb-4 text-muted-foreground">
                Frame 04 — Your details
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="name" label="Full name" required autoComplete="name" value={customer.name} onChange={setCustomerField("name")} invalid={errors.name} />
                <TextField id="phone" label="Phone" required type="tel" inputMode="tel" autoComplete="tel" value={customer.phone} onChange={setCustomerField("phone")} invalid={errors.phone} />
                <TextField id="city" label="City" required autoComplete="address-level2" value={customer.city} onChange={setCustomerField("city")} invalid={errors.city} />
              </div>

              <fieldset className="mt-8">
                <legend className="label-mono mb-3 text-muted-foreground">Pickup or delivery</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { v: "pickup", t: "Self pickup", d: "Kalyan Nagar · free" },
                      { v: "delivery", t: "Delivery", d: `From ${formatINR(DELIVERY_FEE)} · by distance` },
                    ] as const
                  ).map((o) => (
                    <label
                      key={o.v}
                      className={cn(
                        "flex min-h-[64px] cursor-pointer flex-col justify-center border px-4 py-3 transition-colors",
                        method === o.v ? "border-primary bg-surface-2" : "border-border-strong hover:border-foreground/40",
                      )}
                    >
                      <input type="radio" name="method" value={o.v} checked={method === o.v} onChange={() => setMethod(o.v)} className="sr-only" />
                      <span className="text-[15px] font-semibold text-foreground">{o.t}</span>
                      <span className="text-sm text-muted-foreground">{o.d}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {method === "delivery" ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px]">
                  <TextField id="address" label="Delivery address" required autoComplete="street-address" value={customer.address} onChange={setCustomerField("address")} invalid={errors.address} />
                  <TextField id="pincode" label="Pincode" required inputMode="numeric" autoComplete="postal-code" value={customer.pincode} onChange={setCustomerField("pincode")} invalid={errors.pincode} />
                </div>
              ) : null}

              <div className="mt-5">
                <label htmlFor="c-notes" className="label-mono mb-2 block text-muted-foreground">
                  Notes for the team
                </label>
                <textarea
                  id="c-notes"
                  rows={3}
                  value={customer.notes}
                  onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                  placeholder="Shoot type, extra batteries, questions…"
                  className="w-full border border-border-strong bg-transparent px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside aria-labelledby="summary-heading" className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-surface p-6">
              <h2 id="summary-heading" className="font-serif text-display-s text-foreground">
                Order summary
              </h2>
              <dl className="mt-6 space-y-3 text-[15px]">
                <div className="flex justify-between gap-4 text-body">
                  <dt>Subtotal</dt>
                  <dd className="price">{formatINR(subtotal)}</dd>
                </div>
                {saving > 0 ? (
                  <div className="flex justify-between gap-4 text-success">
                    <dt>Duration discount</dt>
                    <dd className="price">−{formatINR(saving)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 text-body">
                  <dt>{method === "delivery" ? "Delivery" : "Pickup"}</dt>
                  <dd className="price">{deliveryFee ? `from ${formatINR(deliveryFee)}` : "Free"}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-border-strong pt-4">
                  <dt className="label-mono text-muted-foreground">Estimated total</dt>
                  <dd className="price text-[32px] text-primary">{formatINR(grandTotal)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A refundable security deposit may apply. We confirm the final amount on WhatsApp.
              </p>
              <TierTable className="mt-5" />
              <FilmButton variant="whatsapp" size="lg" className="mt-6 hidden w-full md:inline-flex" onClick={send}>
                <WhatsAppIcon /> Send booking on WhatsApp
              </FilmButton>
              <Link href="/rental-equipment" className="mt-4 hidden h-11 items-center justify-center text-sm text-primary hover:underline md:flex">
                Keep browsing
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <MobileStickyBar>
        <button
          type="button"
          onClick={send}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp text-[15px] font-semibold text-primary-foreground"
        >
          <WhatsAppIcon /> Send · <span className="price">{formatINR(grandTotal)}</span>
        </button>
      </MobileStickyBar>
    </>
  )
}
