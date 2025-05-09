"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: infoRef, inView: infoInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, x: -50 }}
          animate={formInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground">
              Have questions about our camera rental services? We're here to help! Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter your first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter your last name" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this regarding?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help you?" rows={5} required />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="space-y-8"
          ref={infoRef}
          initial={{ opacity: 0, x: 50 }}
          animate={infoInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0051058428!2d77.63373307575761!3d13.031051513282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b5c3b7e5a7%3A0x1e0f6b7c5e4b8e9a!2s212%2F1%2C%2033%2F3%2F3%2C%202nd%20Floor%2C%20Hennur%20Main%20Rd%2C%20Kalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560043!5e0!3m2!1sen!2sin!4v1714847654321!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Book My DSLR Location"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardContent className="flex items-start p-6">
                <MapPin className="h-5 w-5 text-yellow-500 mr-4 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-muted-foreground">
                    No- 212/1, 33/3/3, 2nd Floor, Hennur Main Road,
                    <br />
                    Post, opposite to SBI, above Muthooth finance gold Loan,
                    <br />
                    Kalyan Nagar, Bengaluru, Karnataka 560043
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex items-start p-6">
                  <Phone className="h-5 w-5 text-yellow-500 mr-4 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 99721 22462</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start p-6">
                  <Mail className="h-5 w-5 text-yellow-500 mr-4 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">bookmydslr@gmail.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="flex items-start p-6">
                <Clock className="h-5 w-5 text-yellow-500 mr-4 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-muted-foreground">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <MessageSquare className="h-5 w-5 text-yellow-500 mr-4 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-muted-foreground mb-3">
                    Need immediate assistance? Chat with our customer support team.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  >
                    <Link href="https://wa.me/919972122642" target="_blank">
                      Start Chat
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
