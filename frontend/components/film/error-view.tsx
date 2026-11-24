"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/film"
import { EmptyState, FilmButton, WhatsAppIcon } from "./primitives"
import { trackWhatsAppClick } from "@/lib/track"

export function ErrorView({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="film-container py-14 md:py-24">
      <EmptyState
        title={
          <>
            Lost <em className="text-primary">focus</em> for a moment.
          </>
        }
        description="We couldn't reach our gear catalogue just now. It's usually back within seconds — try again, or message us and we'll check availability for you."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <FilmButton
              onClick={() => {
                router.refresh()
                reset()
              }}
            >
              Try again
            </FilmButton>
            <FilmButton asChild variant="whatsapp">
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ event_type: "general_enquiry" })}
              >
                <WhatsAppIcon /> WhatsApp us
              </a>
            </FilmButton>
          </div>
        }
      />
    </div>
  )
}
