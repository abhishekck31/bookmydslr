"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/seo/site"
import { cn } from "@/lib/utils"
import { pad2, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/film"
import { useCart } from "@/components/cart-provider"
import { WhatsAppIcon } from "./primitives"
import { trackWhatsAppClick } from "@/lib/track"

/** Fixed bottom bar on small screens. Pages can render their own variant (PDP, cart). */
export function MobileStickyBar({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const { itemCount } = useCart()
  return (
    <div
      className={cn(
        "pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 pt-2.5 md:hidden",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/cart"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-foreground"
          aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        >
          Cart <span className="font-mono text-primary">{pad2(itemCount)}</span>
        </Link>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground"
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <Phone aria-hidden className="h-5 w-5" />
        </a>
        {children ?? (
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ event_type: "general_enquiry" })}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp text-[15px] font-semibold text-primary-foreground"
          >
            <WhatsAppIcon />
            Book on WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
