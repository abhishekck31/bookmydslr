import Link from "next/link"
import { PUBLISHED_LOCALITIES, findPublishedLocality, localityPath } from "@/data/seo/localities"

const FOOTER_AREAS = ["kalyan-nagar", "hennur", "indiranagar", "koramangala", "whitefield", "hsr-layout", "hebbal", "electronic-city"]
  .map((s) => findPublishedLocality(s))
  .filter((l): l is NonNullable<typeof l> => Boolean(l))
import { siteConfig } from "@/lib/seo/site"
import { CATEGORY_GROUPS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/film"
import { FilmEdge } from "./primitives"

const MAP_URL = "https://maps.google.com/?q=Book+My+DSLR+Kalyan+Nagar"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-mono mb-4 text-muted-foreground">{title}</h2>
      {children}
    </div>
  )
}

const linkCls = "inline-flex min-h-[32px] items-center text-[15px] text-body transition-colors hover:text-primary"

export function FilmFooter() {
  const { address } = siteConfig
  return (
    <footer className="bg-surface">
      <FilmEdge left="END OF ROLL ▸ 36" right="BOOK MY DSLR" />
      <div className="film-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <Column title="Contact">
          <address className="space-y-2 not-italic">
            <p className="text-[15px] leading-relaxed text-body">
              {address.streetAddress},
              <br />
              {address.addressLocality}, Bangalore {address.postalCode}
            </p>
            <a href={`tel:${siteConfig.phone}`} className={linkCls}>
              {siteConfig.phoneDisplay}
            </a>
            <br />
            <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className={linkCls}>
              WhatsApp us
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className={linkCls}>
              {siteConfig.email}
            </a>
            <br />
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className={`${linkCls} text-primary`}>
              Open in Maps →
            </a>
          </address>
        </Column>

        <Column title="Hours">
          <p className="text-[15px] text-body">Monday – Sunday</p>
          <p className="price mt-1 text-[22px] text-foreground">8 AM – 10 PM</p>
          <p className="mt-4 text-sm text-muted-foreground">Pickup from Kalyan Nagar, or delivery across Bangalore from ₹200 depending on distance.</p>
        </Column>

        <Column title="Areas served">
          <ul className="grid grid-cols-2 gap-x-4">
            {FOOTER_AREAS.map((area) => (
              <li key={area.slug}>
                <Link href={localityPath(area)} className={linkCls}>
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/camera-rental-bangalore" className={`${linkCls} mt-2 inline-block font-semibold`}>
            All {PUBLISHED_LOCALITIES.length} areas →
          </Link>
        </Column>

        <Column title="Categories">
          <ul>
            {CATEGORY_GROUPS.map((g) => (
              <li key={g.key}>
                <Link href={g.href} className={linkCls}>
                  <span className="label-mono mr-3 w-6 text-primary">{g.code}</span>
                  {g.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rental-equipment" className={linkCls}>
                <span className="label-mono mr-3 w-6 text-primary">∞</span>
                All gear
              </Link>
            </li>
          </ul>
        </Column>
      </div>

      <div className="film-container border-t border-border pb-28 pt-10 md:pb-10">
        <p aria-hidden className="font-serif text-[18vw] leading-[0.85] tracking-tight text-foreground lg:text-[12rem]">
          Book My <em className="text-primary">DSLR</em>
        </p>
        <div className="label-mono mt-8 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
          {siteConfig.social.map((href) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {href.includes("instagram") ? "Instagram" : href.includes("facebook") ? "Facebook" : href.includes("x.com") ? "X" : "Social"}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
