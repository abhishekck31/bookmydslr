import type { Metadata } from "next"
import type { Product } from "@/types"
import {
  Arrow,
  Availability,
  DiscountBadge,
  EmptyState,
  FilmButton,
  FilmEdge,
  FrameLabel,
  PriceTag,
  Stars,
  WhatsAppIcon,
} from "@/components/film/primitives"
import { ContactSheet, FilmProductCard, ProductSheetSkeleton } from "@/components/film/product-card"
import { ReviewCard, REVIEWS, StepsGrid } from "@/components/film/sections"
import { FilmAccordion } from "@/components/film/faq"

export const metadata: Metadata = {
  title: "Style guide | Book My DSLR",
  robots: { index: false, follow: false },
}

const SWATCHES: { name: string; hex: string; use: string }[] = [
  { name: "background", hex: "#13110E", use: "Page" },
  { name: "surface", hex: "#1A1612", use: "Alternate bands" },
  { name: "surface-2", hex: "#1C1814", use: "Hover, image wells" },
  { name: "border", hex: "#2B2620", use: "Hairlines, sprockets" },
  { name: "border-strong", hex: "#3A332A", use: "Outlines, inputs" },
  { name: "text", hex: "#F2EADF", use: "Primary text" },
  { name: "text-2", hex: "#D6CCBE", use: "Body copy" },
  { name: "muted", hex: "#A89F92", use: "Labels, meta" },
  { name: "subtle", hex: "#7E766B", use: "Strikethrough only" },
  { name: "accent", hex: "#F59E0B", use: "CTAs, prices, codes" },
  { name: "tile", hex: "#EAE3D8", use: "Product image tile" },
  { name: "success", hex: "#7FD1A0", use: "Available" },
  { name: "danger", hex: "#F2A0A0", use: "Booked, errors" },
  { name: "whatsapp", hex: "#25D366", use: "WhatsApp fill" },
]

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const TYPE: { token: string; cls: string; spec: string; sample: string }[] = [
  { token: "display-xl", cls: "font-serif text-display-xl", spec: "Serif 124 / 54", sample: "Rent pro gear" },
  { token: "display-l", cls: "font-serif text-display-l", spec: "Serif 80 / 40", sample: "Call action." },
  { token: "display-m", cls: "font-serif text-display-m", spec: "Serif 64 / 32", sample: "On the bench" },
  { token: "display-s", cls: "font-serif text-display-s", spec: "Serif 30 / 22", sample: "Order summary" },
  { token: "title", cls: "font-serif text-title", spec: "Serif 26 / 18", sample: "Sony FX3 Cinema Line" },
  { token: "body-l", cls: "text-[15px] md:text-[17px] leading-relaxed text-body", spec: "Sans 17 / 15", sample: "Pickup from Kalyan Nagar or delivery across Bangalore." },
  { token: "body", cls: "text-sm md:text-[15px] leading-relaxed text-body", spec: "Sans 15 / 14", sample: "Every camera and lens is checked before rental." },
  { token: "meta", cls: "text-xs md:text-[13px] text-muted-foreground", spec: "Sans 13 / 12", sample: "Sony · Full-frame mirrorless" },
  { token: "label", cls: "label-mono text-muted-foreground", spec: "Mono 11 / 10 caps", sample: "Frame 02 ▸ 07A" },
  { token: "price-l", cls: "price text-[28px] md:text-4xl text-primary", spec: "Sans 700 36 / 28", sample: "₹1,499" },
  { token: "price", cls: "price text-lg md:text-[26px] text-primary", spec: "Sans 700 26 / 18", sample: "₹1,499" },
]

const SAMPLE: Product = {
  id: "7",
  name: "Sample Mirrorless Body",
  description: "",
  price: 1499,
  image: "/images/hero-cinema-camera.png",
  category: { id: "3", name: "Mirrorless", slug: "mirrorless" },
  brand: "Brand",
  type: "equipment",
  isAvailable: true,
}

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="film-section border-b border-border">
      <div className="film-container grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <FrameLabel n={n} />
        <div className="min-w-0">
          <h2 className="mb-8 font-serif text-display-m text-foreground">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="film-container py-14">
          <p className="label-mono text-muted-foreground">Internal · not indexed</p>
          <h1 className="mt-3 font-serif text-display-l text-foreground">
            Editorial <em className="text-primary">Film</em> — style guide
          </h1>
        </div>
      </section>

      <Block n={1} title="Colour">
        <ul className="contact-sheet grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
          {SWATCHES.map((s) => {
            const onBg = contrast(s.hex, "#13110E")
            return (
              <li key={s.name} className="bg-background p-3">
                <div className="h-20 border border-border" style={{ background: s.hex }} />
                <p className="mt-3 text-sm text-foreground">{s.name}</p>
                <p className="label-mono text-muted-foreground">{s.hex}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.use}</p>
                <p className="label-mono mt-2 text-[10px] text-body">
                  {onBg.toFixed(1)}:1 on bg {onBg >= 4.5 ? "· AA" : onBg >= 3 ? "· AA large" : ""}
                </p>
              </li>
            )
          })}
        </ul>
      </Block>

      <Block n={2} title="Type">
        <ul className="border-t border-border">
          {TYPE.map((t) => (
            <li key={t.token} className="grid gap-2 border-b border-border py-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline">
              <p className="label-mono text-muted-foreground">
                {t.token}
                <span className="block normal-case tracking-normal text-subtle">{t.spec}</span>
              </p>
              <p className={`${t.cls} text-foreground`}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block n={3} title="Spacing, radius, edges">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 88].map((s) => (
            <div key={s} className="text-center">
              <div className="bg-primary" style={{ width: s, height: s }} />
              <p className="label-mono mt-2 text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-6">
          <div className="flex h-24 w-40 items-center justify-center border border-border-strong bg-tile text-sm text-primary-foreground">0 — frames</div>
          <div className="flex h-12 w-40 items-center justify-center rounded-full border border-border-strong text-sm text-foreground">999 — pills</div>
        </div>
        <div className="mt-10 border border-border">
          <FilmEdge />
        </div>
      </Block>

      <Block n={4} title="Buttons">
        <div className="space-y-6">
          {(["primary", "secondary", "whatsapp", "invert"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <span className="label-mono w-24 text-muted-foreground">{v}</span>
              <FilmButton variant={v} size="lg">
                {v === "whatsapp" ? <WhatsAppIcon /> : null}
                Default {v === "primary" ? <Arrow /> : null}
              </FilmButton>
              <FilmButton variant={v}>Medium</FilmButton>
              <FilmButton variant={v} size="sm">Small</FilmButton>
              <FilmButton variant={v} disabled>
                Disabled
              </FilmButton>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono w-24 text-muted-foreground">ghost</span>
            <FilmButton variant="ghost">
              See all gear <Arrow />
            </FilmButton>
          </div>
          <p className="text-sm text-muted-foreground">Tab through this page to see the 2px amber focus ring on every control.</p>
        </div>
      </Block>

      <Block n={5} title="Price, badges, status">
        <div className="flex flex-wrap items-center gap-8">
          <PriceTag price={1499} />
          <PriceTag price={1499} originalPrice={1799} />
          <PriceTag price={1499} originalPrice={1799} size="lg" />
          <DiscountBadge percentOff={17} originalPrice={1799} />
          <Availability available />
          <Availability available={false} />
          <Stars rating={5} />
          <Stars rating={4} />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="inline-flex h-11 items-center rounded-full border border-border-strong px-4 text-sm text-body">Filter chip</span>
          <span className="inline-flex h-11 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background">Active chip ×</span>
        </div>
      </Block>

      <Block n={6} title="Product cards">
        <ContactSheet className="lg:grid-cols-4">
          <FilmProductCard product={SAMPLE} />
          <FilmProductCard product={{ ...SAMPLE, id: "8", isAvailable: false, name: "Booked Sample Body" }} />
        </ContactSheet>
        <p className="label-mono mb-4 mt-10 text-muted-foreground">Loading</p>
        <ProductSheetSkeleton count={4} />
      </Block>

      <Block n={7} title="Steps, reviews, FAQ">
        <StepsGrid />
        <div className="contact-sheet mt-10 md:grid-cols-2">
          {REVIEWS.slice(0, 2).map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
        <FilmAccordion
          className="mt-10 max-w-3xl"
          items={[
            { question: "Do I need to pay online?", answer: "No. Send your booking on WhatsApp and we confirm availability and payment details there." },
            { question: "Can I pick up the same day?", answer: "Often, yes — message us with your time and we'll check." },
          ]}
        />
      </Block>

      <Block n={8} title="Empty state">
        <EmptyState description="Add cameras, lenses or support gear, then send the whole booking to us on WhatsApp." action={<FilmButton>Browse gear <Arrow /></FilmButton>} />
      </Block>
    </>
  )
}
