"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHero } from "@/components/layout/page-hero"

const termsSections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing and using the services provided by Book My DSLR, including our website and rental services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.`,
  },
  {
    id: "rental",
    title: "2. Rental Agreement",
    content: `When you rent equipment from Book My DSLR, you are entering into a rental agreement. This agreement begins when you place your order and ends when the equipment is returned and inspected by our staff.

Rental period: The rental period begins on the date of pickup or delivery and ends on the agreed return date. Late returns will incur additional charges.

Equipment condition: All equipment is thoroughly checked before rental. By accepting the equipment, you acknowledge it is in good working condition. You are responsible for returning it in the same condition, allowing for normal wear and tear.`,
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    content: `Payment for rentals must be made in full at the time of booking. We accept credit/debit cards and online payment services including UPI.

Security deposit: A security deposit may be required for certain equipment or first-time customers. This deposit will be refunded upon safe return of the equipment, subject to deductions for damage or late returns.

Cancellation: Cancellations made more than 48 hours before the rental period receive a full refund. Cancellations within 48 hours may be subject to a 50% cancellation fee.`,
  },
  {
    id: "responsibilities",
    title: "4. Customer Responsibilities",
    content: `You are responsible for the proper use and care of rented equipment.

Proper use: Equipment should be used for its intended purpose per manufacturer guidelines. Misuse may result in additional charges.

Late returns: Charged at the daily rental rate for each day or part thereof the equipment is overdue.

Damage or loss: You are responsible for damage, theft, accidental damage, and damage due to improper use during the rental period.`,
  },
  {
    id: "protection",
    title: "5. Damage Protection Plan",
    content: `We offer an optional Damage Protection Plan covering accidental damage. This plan does not cover loss, theft, or damage due to negligence or misuse.`,
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content: `Book My DSLR is not liable for any indirect, incidental, special, or consequential damages arising from the use of our services or equipment, including loss of data, income, or profit.`,
  },
  {
    id: "privacy",
    title: "7. Privacy Policy",
    content: `We respect your privacy and are committed to protecting your personal information. Contact us if you have questions about how we collect, use, and safeguard your data.`,
  },
  {
    id: "changes",
    title: "8. Changes to Terms",
    content: `Book My DSLR reserves the right to modify these Terms and Conditions at any time. Changes are effective immediately upon posting. It is your responsibility to review these terms periodically.`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f0f1f8]">
      <PageHero
        icon={FileText}
        badge="Legal"
        title="Terms &"
        highlight="Conditions"
        description="Please read these terms carefully before using our rental services. They outline your rights and responsibilities when renting equipment from Book My DSLR."
      />

      <section className="container-premium pb-16 pt-4 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Quick nav — desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                On this page
              </p>
              <nav className="space-y-1">
                {termsSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-800"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-500">Last updated</p>
                <p className="text-sm font-semibold text-slate-900">January 2024</p>
              </div>
            </div>
          </motion.aside>

          {/* Accordion content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Accordion
              type="multiple"
              defaultValue={["acceptance", "rental"]}
              className="space-y-3"
            >
              {termsSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-100 bg-white px-0 shadow-sm"
                >
                  <AccordionTrigger className="px-5 py-4 text-left font-semibold text-slate-900 hover:no-underline hover:text-amber-700 md:px-6">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-slate-100 px-5 pb-5 pt-2 md:px-6">
                    <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600 md:text-base">
                      {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"
            >
              <h3 className="text-lg font-bold text-slate-900">Questions about these terms?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Contact us if you need clarification before booking.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-500" />
                  <a href="mailto:bookmydslr@gmail.com" className="hover:text-amber-600">
                    bookmydslr@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-500" />
                  <a href="tel:+919972122462" className="hover:text-amber-600">
                    +91 99721 22462
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span>
                    2nd Floor, No- 212/1, Hennur Main Road, Kalyan Nagar, Bengaluru 560043
                  </span>
                </li>
              </ul>
              <Button
                asChild
                className="mt-6 h-12 rounded-full bg-amber-500 px-8 font-semibold text-white hover:bg-amber-600"
              >
                <Link href="/contact">
                  Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-amber-500 py-12">
        <div className="container-premium text-center">
          <p className="text-lg font-semibold text-white">
            Ready to rent? Browse our inventory and book online.
          </p>
          <Button
            asChild
            className="mt-4 h-12 rounded-full bg-slate-900 px-8 font-semibold text-white hover:bg-slate-800"
          >
            <Link href="/rental-equipment">Browse Equipment</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
