"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50 py-20 border-b border-gray-100">
        <div className="container-premium text-center">
          <motion.div
            className="mb-6 mx-auto w-16 h-1 bg-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-slate-500 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Please read these terms carefully before using our services.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-premium max-w-4xl">
          <motion.div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-amber-600 hover:prose-a:text-amber-500 prose-li:text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Book My DSLR, including our website and rental services,
              you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms,
              please do not use our services.
            </p>

            <h2>2. Rental Agreement</h2>
            <p>
              When you rent equipment from Book My DSLR, you are entering into a rental agreement. This agreement begins
              when you place your order and ends when the equipment is returned and inspected by our staff.
            </p>

            <h3>2.1 Rental Period</h3>
            <p>
              The rental period begins on the date of pickup or delivery and ends on the agreed return date. Late
              returns will incur additional charges as outlined in section 4.2.
            </p>

            <h3>2.2 Equipment Condition</h3>
            <p>
              All equipment is thoroughly checked and tested before being rented out. By accepting the equipment, you
              acknowledge that it is in good working condition. You are responsible for returning the equipment in the
              same condition, allowing for normal wear and tear.
            </p>

            <h2>3. Payment Terms</h2>
            <p>
              Payment for rentals must be made in full at the time of booking. We accept various payment methods
              including credit/debit cards and online payment services via UPI.
            </p>

            <h3>3.1 Security Deposit</h3>
            <p>
              A security deposit may be required for certain equipment or for first-time customers. This deposit will be refunded upon the safe
              return of the equipment, subject to any deductions for damage or late returns.
            </p>

            <h3>3.2 Cancellation Policy</h3>
            <p>
              Cancellations made more than 48 hours before the rental period begins will receive a full refund.
              Cancellations made within 48 hours of the rental period may be subject to a cancellation fee of 50% of the
              rental cost.
            </p>

            <h2>4. Customer Responsibilities</h2>
            <p>As a customer, you are responsible for the proper use and care of the rented equipment.</p>

            <h3>4.1 Proper Use</h3>
            <p>
              Equipment should be used for its intended purpose and in accordance with manufacturer guidelines. Misuse
              of equipment may result in additional charges.
            </p>

            <h3>4.2 Late Returns</h3>
            <p>
              Late returns will be charged at the daily rental rate for each day or part thereof that the equipment is
              overdue.
            </p>

            <h3>4.3 Damage or Loss</h3>
            <p>
              You are responsible for any damage to or loss of the equipment during the rental period. This includes
              theft, accidental damage, and damage due to improper use.
            </p>

            <h2>5. Damage Protection Plan</h2>
            <p>
              We offer an optional Damage Protection Plan that covers accidental damage to the equipment. This plan does
              not cover loss, theft, or damage due to negligence or misuse.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Book My DSLR is not liable for any indirect, incidental, special, or consequential damages arising from
              the use of our services or equipment, including but not limited to loss of data, income, or profit.
            </p>

            <h2>7. Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information. Please refer to our
              Privacy Policy for details on how we collect, use, and safeguard your data.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              Book My DSLR reserves the right to modify these Terms and Conditions at any time. Changes will be
              effective immediately upon posting on our website. It is your responsibility to review these terms
              periodically.
            </p>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mt-12 not-prose">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
              <p className="text-slate-600 mb-6">If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
              <ul className="space-y-2 text-slate-700 font-medium">
                <li>Email: bookmydslr@gmail.com</li>
                <li>Phone: +91 99721 22462</li>
                <li>Address: 2nd Floor, No- 212/1, Hennur Main Road, Kalyan Nagar, Bengaluru, Karnataka 560043</li>
              </ul>
            </div>

            <div className="mt-12 text-center border-t border-gray-100 pt-8 not-prose">
              <p className="font-semibold text-gray-500 mb-6 text-sm uppercase tracking-widest">Last updated: January 2024</p>
              <Button
                asChild
                size="lg"
                className="bg-slate-900 text-white hover:bg-black rounded-full px-8 h-12"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
