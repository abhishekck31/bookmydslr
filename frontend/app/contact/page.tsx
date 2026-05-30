"use client"

import { useState } from "react"
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildLocalBusinessSchema } from "@/lib/seo/schema"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you shortly.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
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
      <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-950 border-b border-gray-800 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-premium text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Touch</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Have questions about gear availability or need a custom quote?
              We are here to help you get the perfect setup.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-premium py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 items-start">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-12"
          >
            <div>
              <h3 className="text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">Contact Info</h3>
              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-100 transition-all shrink-0 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600 font-medium">+91 99721 22462</p>
                    <p className="text-xs text-gray-400 mt-1">Mon-Sun 8am to 10pm</p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-100 transition-all shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600 font-medium">bookmydslr@gmail.com</p>
                    <p className="text-xs text-gray-400 mt-1">Online support 24/7</p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-100 transition-all shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Studio Location</p>
                    <p className="text-gray-600 leading-relaxed text-sm font-medium">
                      2nd Floor, No- 212/1, Hennur Main Road,<br />
                      Kalyan Nagar, Bengaluru, Karnataka 560043
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div>
              <h3 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">Business Hours</h3>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Monday - Sunday</span>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">8:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4 items-start">
              <div className="bg-amber-100 p-2 rounded-full shrink-0">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm mb-1">Quick Response Promise</h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                  We typically reply to inquiries within 2 hours during business hours. For urgent rentals, please call us directly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white">
                <div className="bg-gray-50/50 px-10 py-8 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                  <p className="text-gray-500 mt-1">Fill out the form below and we will get back to you.</p>
                </div>
                <CardContent className="p-10">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all rounded-xl text-base px-5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all rounded-xl text-base px-5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Inquiry about Sony A7III..."
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all rounded-xl text-base px-5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us what you need..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[200px] bg-gray-50 border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all rounded-xl resize-none p-5 text-base"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-16 text-lg bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 transition-all transform hover:-translate-y-1">
                      Send Message <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      </main>
    </>
  )
}
