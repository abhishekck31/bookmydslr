"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Wrench, ImageIcon, Check, Video, Aperture, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-premium flex flex-col items-center justify-center text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Capabilities & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Services</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl text-slate-400 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            We provide end-to-end production support, from specialized gear rental to expert repair services.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-premium max-w-5xl">

          {/* Service 1: Rental */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row gap-12 items-center mb-32"
          >
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <Camera className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Camera Rental</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                Access the world's best cameras without the heavy investment. From RED cinema cameras to the latest Sony mirrorless bodies, our vault is your arsenal.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Cinema Line (RED, Sony FX)",
                  "High-Res Mirrorless (Sony A7, Canon R5)",
                  "Premium GM & Cine Lenses",
                  "Comprehensive Rigging Solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="h-5 w-5 text-amber-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-black h-12 px-8">
                <Link href="/products">Explore Inventory</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="aspect-square rounded-[3rem] bg-gray-100 relative overflow-hidden shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                <Image src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" alt="Camera Rental" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Service 2: Repair */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row gap-12 items-center mb-32"
          >
            <div className="w-full md:w-1/2">
              <div className="aspect-square rounded-[3rem] bg-gray-100 relative overflow-hidden shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop" alt="Camera Repair" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Wrench className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Expert Repair Lab</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                Factory-certified repair services for your precision equipment. We treat your gear with the same care as our own, using genuine parts and advanced diagnostics.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Sensor Cleaning (ISO Class 5 Cleanroom)",
                  "Lens Calibration & Alignment",
                  "Water Damage Restoration",
                  "Firmware Updates & Checks"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="h-5 w-5 text-blue-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 text-slate-700 hover:text-white hover:bg-slate-900 h-12 px-8">
                <Link href="/contact">Book Service</Link>
              </Button>
            </div>
          </motion.div>

          {/* Service 3: Production */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Video className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Production Services</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                We don't just rent gear; we can shoot for you. Our team of experienced cinematographers and photographers are available for commercial commissions.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Corporate Films & Ad Shoots",
                  "Product Photography",
                  "Event Coverage",
                  "Drone Cinematography"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="h-5 w-5 text-purple-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 text-slate-700 hover:text-white hover:bg-slate-900 h-12 px-8">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="aspect-square rounded-[3rem] bg-gray-100 relative overflow-hidden shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                <Image src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop" alt="Production Services" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
