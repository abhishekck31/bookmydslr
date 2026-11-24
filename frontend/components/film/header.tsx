"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import { cn } from "@/lib/utils"
import { pad2 } from "@/lib/film"
import { FilmEdge } from "./primitives"

const CATEGORY_NAV = [
  { name: "Cameras", href: "/cameras" },
  { name: "Lenses", href: "/lenses" },
  { name: "Accessories", href: "/accessories" },
  { name: "All gear", href: "/rental-equipment" },
]

const MORE_NAV = [
  { name: "How it works", href: "/how-it-works" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Terms", href: "/terms" },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-[26px] leading-none tracking-tight text-foreground md:text-[30px]", className)}>
      Book My <em className="text-primary">DSLR</em>
    </span>
  )
}

function SearchForm({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter()
  const [q, setQ] = React.useState("")
  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault()
        const query = q.trim()
        router.push(query ? `/rental-equipment?q=${encodeURIComponent(query)}` : "/rental-equipment")
      }}
    >
      <label htmlFor={autoFocus ? "menu-search" : "header-search"} className="sr-only">
        Search gear
      </label>
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id={autoFocus ? "menu-search" : "header-search"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search cameras, lenses…"
        autoFocus={autoFocus}
        className="h-11 w-full rounded-full border border-border-strong bg-transparent pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </form>
  )
}

export function FilmHeader() {
  const pathname = usePathname() ?? "/"
  const { itemCount } = useCart()
  const { showCartGlow } = useCartGlow()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => setOpen(false), [pathname])

  const cartPill = (
    <Link
      href="/cart"
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary",
        showCartGlow && "border-primary",
      )}
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
    >
      Cart <span className="font-mono text-primary">{pad2(itemCount)}</span>
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="film-container grid h-16 grid-cols-[1fr_auto] items-center gap-4 border-b border-border md:h-20 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: category nav (desktop) */}
        <nav aria-label="Categories" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {CATEGORY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    isActive(pathname, item.href) ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Center: wordmark */}
        <Link href="/" className="justify-self-start lg:justify-self-center" aria-label="Book My DSLR — home">
          <Wordmark />
        </Link>

        {/* Right: search + cart (desktop) / menu (mobile) */}
        <div className="flex items-center justify-end gap-3">
          <SearchForm className="hidden w-56 xl:block xl:w-64" />
          <div className="hidden md:block">{cartPill}</div>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-x-0 top-0 z-50 max-h-[100dvh] overflow-y-auto border-b border-border bg-background pb-8 data-[state=open]:animate-in data-[state=open]:fade-in-0">
                <div className="film-container flex h-16 items-center justify-between border-b border-border">
                  <Dialog.Title asChild>
                    <span>
                      <Wordmark />
                    </span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <FilmEdge />
                <div className="film-container pt-6">
                  <Dialog.Description className="sr-only">Site navigation and search</Dialog.Description>
                  <SearchForm autoFocus />
                  <nav aria-label="Menu" className="mt-6">
                    <p className="label-mono mb-2 text-muted-foreground">Gear</p>
                    <ul className="border-t border-border">
                      {CATEGORY_NAV.map((item, i) => (
                        <li key={item.href} className="border-b border-border">
                          <Link
                            href={item.href}
                            className="flex h-14 items-center justify-between font-serif text-[22px] text-foreground"
                          >
                            {item.name}
                            <span className="label-mono text-primary">{i + 1}A</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="label-mono mb-2 mt-8 text-muted-foreground">Studio</p>
                    <ul className="grid grid-cols-2 gap-x-4">
                      {MORE_NAV.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="flex h-11 items-center text-[15px] text-body hover:text-foreground">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <FilmEdge />
    </header>
  )
}
