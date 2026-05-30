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
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />

        <div className="container-premium text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Simple & Fast</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">How It Works</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-slate-400 font-light leading-relaxed">
            Renting a camera shouldn't be complicated. We've optimized our process to get gear in your hands in minutes.
          </p>
          <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-amber-50 min-w-[200px] h-14 text-lg font-bold">
            <Link href="/products">Browse Gear</Link>
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div className="absolute top-8 left-8 -right-8 h-0.5 bg-gray-100 hidden lg:block -z-10" />
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 text-xl font-bold border border-slate-100 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-light leading-relaxed mb-6 flex-1">{step.description}</p>

                  <ul className="text-left w-full space-y-2">
                    {step.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 mr-2 mt-0.5 shrink-0" />
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
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container-premium max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500">
              Everything you need to know about the rental process.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 bg-white rounded-2xl px-6 data-[state=open]:border-amber-400 transition-all duration-300">
                <AccordionTrigger className="text-left font-bold text-lg text-slate-900 py-6 hover:text-amber-600 hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base pb-6 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="container-premium text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Start Creating?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-slate-400">
            Join thousands of satisfied creators in Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-600 rounded-full h-14 px-10 text-lg font-bold shadow-lg shadow-amber-500/20">
              <Link href="/products">Browse Cameras</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800 rounded-full h-14 px-10 text-lg"
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
