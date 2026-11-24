"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { PageHero } from "@/components/layout/page-hero"
import { JsonLd } from "@/components/seo/json-ld"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: "+91 99721 22462",
    href: "tel:+919972122462",
    note: "Mon–Sun, 8 AM – 10 PM",
  },
  {
    icon: Mail,
    title: "Email",
    value: "bookmydslr@gmail.com",
    href: "mailto:bookmydslr@gmail.com",
    note: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    title: "Studio",
    value: "Kalyan Nagar, Bangalore",
    href: "https://maps.google.com/?q=Book+My+DSLR+Kalyan+Nagar",
    note: "2nd Floor, Hennur Main Road",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you shortly.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Contact Book My DSLR | Camera Rental Bangalore",
            description:
              "Contact Book My DSLR for camera rentals, lens rentals, filmmaking gear, and local support in Bangalore.",
            path: "/contact",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          buildLocalBusinessSchema("/contact"),
        ]}
      />

      <main className="min-h-screen bg-background">
        <PageHero
          icon={MessageCircle}
          badge="We're here to help"
          title="Get in"
          highlight="Touch"
          description="Questions about gear availability, custom quotes, or delivery in Bangalore? Reach out — we typically respond within 2 hours during business hours."
        />

        <section className="film-container pb-16 pt-8 md:pb-20">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Contact cards */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-4 lg:col-span-2"
            >
              {contactMethods.map((method, i) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.icon === MapPin ? "_blank" : undefined}
                  rel={method.icon === MapPin ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="group flex gap-4 rounded-none border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-surface-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {method.title}
                    </p>
                    <p className="mt-0.5 font-bold text-foreground">{method.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{method.note}</p>
                  </div>
                </motion.a>
              ))}

              <div className="rounded-none border border-border bg-background p-5">
                <div className="mb-3 flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-bold">Business Hours</span>
                </div>
                <div className="flex items-center justify-between rounded-none bg-surface px-4 py-3 text-sm">
                  <span className="text-body">Monday – Sunday</span>
                  <span className="font-semibold text-foreground">8 AM – 10 PM</span>
                </div>
              </div>

              <div className="flex gap-3 rounded-none border border-border-strong bg-surface-2 p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-primary">Urgent rental?</p>
                  <p className="mt-1 text-xs leading-relaxed text-primary">
                    Call us directly for same-day availability and fastest booking.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="h-12 w-full rounded-full border-border-strong bg-surface-2 font-semibold text-primary hover:bg-surface-2"
              >
                <Link
                  href="https://wa.me/919972122462"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </Link>
              </Button>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-none border border-border bg-background">
                <div className="border-b border-border bg-surface px-6 py-5 md:px-8 md:py-6">
                  <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill out the form and we&apos;ll get back to you soon.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-body">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 rounded-none border-border bg-surface focus:border-primary focus:ring-border-strong"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-body">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 rounded-none border-border bg-surface focus:border-primary focus:ring-border-strong"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-body">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Rental inquiry, repair, production…"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12 rounded-none border-border bg-surface focus:border-primary focus:ring-border-strong"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-body">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what you need — dates, gear, location…"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[160px] resize-none rounded-none border-border bg-surface focus:border-primary focus:ring-border-strong"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border bg-background py-10">
          <div className="film-container flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-body">
              Prefer browsing first?{" "}
              <Link href="/rental-equipment" className="font-semibold text-primary hover:text-primary">
                View all equipment
              </Link>
            </p>
            <Button asChild variant="ghost" className="rounded-full font-semibold text-body">
              <Link href="/how-it-works">
                How it works <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
