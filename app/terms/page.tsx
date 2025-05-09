"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section ref={headerRef} className="bg-white py-16 border-b border-gray-100">
        <div className="container text-center">
          <motion.div
            className="mb-6 mx-auto w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
            initial={{ width: 0 }}
            animate={headerInView ? { width: 96 } : {}}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Terms and Conditions
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Please read these terms carefully before using our services
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-12 bg-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto p-8 rounded-lg shadow-sm bg-white border border-gray-50 prose prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
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
              including credit/debit cards and online payment services.
            </p>

            <h3>3.1 Security Deposit</h3>
            <p>
              A security deposit may be required for certain equipment. This deposit will be refunded upon the safe
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

            <h2>9. Contact Information</h2>
            <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
            <ul className="text-gray-600">
              <li>Email: info@bookmydslr.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 Photography Lane, Bangalore, Karnataka 560001, India</li>
            </ul>

            <div className="mt-12 text-center border-t border-gray-100 pt-8">
              <p className="font-semibold text-gray-700">Last updated: May 3, 2023</p>
              <Button
                asChild
                className="mt-6 bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400 shadow-sm transition-all duration-300 hover:shadow"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
