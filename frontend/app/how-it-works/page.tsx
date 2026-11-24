"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, CreditCard, Truck, Clock, CheckCircle } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema } from "@/lib/seo/schema"

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "How Camera Rental Works in Bangalore | Book My DSLR",
            description:
              "Understand the Book My DSLR rental process for camera, lens, and filmmaking gear bookings in Bangalore.",
            path: "/how-it-works",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How It Works", path: "/how-it-works" },
          ]),
        ]}
      />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-surface text-foreground py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />

        <div className="film-container text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 border border-primary rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Simple & Fast</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-normal mb-6">How It Works</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-muted-foreground font-light leading-relaxed">
            Renting a camera shouldn't be complicated. We've optimized our process to get gear in your hands in minutes.
          </p>
          <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-surface-2 min-w-[200px] h-14 text-lg font-bold">
            <Link href="/products">Browse Gear</Link>
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-background">
        <div className="film-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div className="absolute top-8 left-8 -right-8 h-0.5 bg-surface hidden lg:block -z-10" />
                <div className="bg-background p-8 rounded-none border border-border hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-none bg-surface text-foreground flex items-center justify-center mb-6 text-xl font-bold border border-border group-hover:bg-surface group-hover:text-primary transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6 flex-1">{step.description}</p>

                  <ul className="text-left w-full space-y-2">
                    {step.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-body font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-primary mr-2 mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="film-container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-normal mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about the rental process.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-background rounded-none px-6 data-[state=open]:border-amber-400 transition-all duration-300">
                <AccordionTrigger className="text-left font-bold text-lg text-foreground py-6 hover:text-primary hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-body leading-relaxed text-base pb-6 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface text-foreground py-24 relative overflow-hidden">
        <div className="film-container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-normal mb-6">Ready to Start Creating?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
            Join thousands of satisfied creators in Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary rounded-full h-14 px-10 text-lg font-bold">
              <Link href="/products">Browse Cameras</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border-strong text-foreground hover:bg-surface-2 rounded-full h-14 px-10 text-lg"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

// Sample data
const steps = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Find the perfect gear for your shoot from our extensive inventory.",
    icon: <Camera className="h-8 w-8" />,
    features: [
      "Compare models side-by-side",
      "View detailed specs & gallery",
      "Check real-time availability"
    ]
  },
  {
    id: 2,
    title: "Book & Verify",
    description: "Secure your dates and complete a quick one-time verification.",
    icon: <CreditCard className="h-8 w-8" />,
    features: [
      "Simple WhatsApp checkout",
      "Instant booking confirmation",
      "Secure & transparent pricing"
    ]
  },
  {
    id: 3,
    title: "Pickup or Delivery",
    description: "Get your gear delivered to your set or pick it up from our studio.",
    icon: <Truck className="h-8 w-8" />,
    features: [
      "Same-day delivery available",
      "Thorough gear walkthrough",
      "Zero-hassle handover"
    ]
  },
  {
    id: 4,
    title: "Shoot & Return",
    description: "Create your masterpiece and return the gear when you're done.",
    icon: <Clock className="h-8 w-8" />,
    features: [
      "Flexible return hours",
      "Easy extension options",
      "Quick return inspection"
    ]
  },
]

const faqs = [
  {
    question: "What documents do I need to rent?",
    answer:
      "For efficient verification, we require a valid government-issued photo ID (Aadhar/Driving License) and a quick address proof. First-time renters may need a standard security deposit or a reference.",
  },
  {
    question: "Do you offer damage protection?",
    answer:
      "Yes! We highly recommend our optional Damage Protection Plan. It covers accidental damage during your shoot, giving you complete peace of mind. Without it, you are liable for repair costs.",
  },
  {
    question: "Can I pick up the gear a day early?",
    answer:
      "Absolutely. We usually allow pickup after 7 PM on the day before your rental starts, free of charge, so you can prep your kit. Just let us know in advance.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "Plans change. You can cancel up to 48 hours before your booking for a full refund. Cancellations within 48 hours may incur a small fee to cover the reservation hold.",
  },
  {
    question: "Is there a student discount?",
    answer:
      "We love supporting upcoming talent! Students with a valid college ID get a special discount on select gear. Contact our support team to apply.",
  },
]
