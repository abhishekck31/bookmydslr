"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Camera,
  Wrench,
  Video,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/layout/page-hero"
import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema"

const services = [
  {
    icon: Camera,
    accent: "amber",
    title: "Camera Rental",
    description:
      "Access professional DSLR, mirrorless, and cinema cameras without the heavy investment. Our inventory is maintained and ready for your next shoot.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    features: [
      "Cinema & mirrorless bodies",
      "Premium GM & cine lenses",
      "Rigging & accessories",
      "Same-day pickup in Bangalore",
    ],
    cta: { label: "Browse Equipment", href: "/rental-equipment" },
    primary: true,
  },
  {
    icon: Wrench,
    accent: "blue",
    title: "Expert Repair Lab",
    description:
      "Factory-certified repair for precision equipment. Genuine parts, advanced diagnostics, and careful handling for every job.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    features: [
      "Sensor cleaning",
      "Lens calibration",
      "Water damage restoration",
      "Firmware updates",
    ],
    cta: { label: "Book Service", href: "/contact" },
    primary: false,
  },
  {
    icon: Video,
    accent: "indigo",
    title: "Production Services",
    description:
      "Beyond gear rental — our cinematographers and photographers are available for commercials, events, and creative commissions.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    features: [
      "Corporate films & ads",
      "Product photography",
      "Event coverage",
      "Drone cinematography",
    ],
    cta: { label: "Get a Quote", href: "/contact" },
    primary: false,
  },
]

const accentStyles = {
  amber: {
    icon: "bg-surface-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    check: "text-primary",
    ring: "hover:border-border-strong",
  },
  blue: {
    icon: "bg-surface-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    check: "text-primary",
    ring: "hover:border-border-strong",
  },
  indigo: {
    icon: "bg-surface-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    check: "text-primary",
    ring: "hover:border-border-strong",
  },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Rental Services Bangalore | Book My DSLR",
            description:
              "Explore camera rental, repair, and production support services from Book My DSLR in Bangalore.",
            path: "/services",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <main className="min-h-screen bg-background">
        <PageHero
          icon={Sparkles}
          badge="What we offer"
          title="Our"
          highlight="Services"
          description="End-to-end production support in Bangalore — from specialized gear rental to expert repair and on-set production help."
        />

        <section className="film-container py-10 md:py-16">
          <div className="grid gap-6 md:gap-8">
            {services.map((service, index) => {
              const styles = accentStyles[service.accent as keyof typeof accentStyles]
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`lift group overflow-hidden border border-border bg-background ${styles.ring}`}
                >
                  <div className="grid lg:grid-cols-2">
                    <div
                      className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[320px] ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent lg:bg-gradient-to-r" />
                    </div>

                    <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                      <div
                        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${styles.icon}`}
                      >
                        <service.icon className="h-7 w-7" />
                      </div>
                      <h2 className="mb-3 text-2xl font-serif font-normal text-foreground md:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-body md:text-base">
                        {service.description}
                      </p>
                      <ul className="mb-8 space-y-3">
                        {service.features.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-sm font-medium text-body"
                          >
                            <Check className={`h-4 w-4 shrink-0 ${styles.check}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        className={
                          service.primary
                            ? "h-12 w-fit rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
                            : "h-12 w-fit rounded-full border-border-strong bg-transparent px-8 font-semibold text-foreground hover:bg-surface-2"
                        }
                        variant={service.primary ? "default" : "outline"}
                      >
                        <Link href={service.cta.href}>
                          {service.cta.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="bg-primary py-14 md:py-16">
          <div className="film-container text-center">
            <h2 className="text-2xl font-serif font-normal text-white md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground">
              Tell us about your shoot and we&apos;ll recommend the right gear or team.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-surface px-8 font-semibold text-white hover:bg-surface-2"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
