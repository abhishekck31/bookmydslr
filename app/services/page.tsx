"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Wrench, ImageIcon, Check } from "lucide-react"

export default function ServicesPage() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: rentalRef, inView: rentalInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: repairRef, inView: repairInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: photoshootRef, inView: photoshootInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section ref={headerRef} className="relative bg-white py-16">
        <div className="container flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional photography services to meet all your needs
          </motion.p>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 mt-6"
            initial={{ opacity: 0, width: 0 }}
            animate={headerInView ? { opacity: 1, width: 80 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>
      </section>

      {/* Camera Rental Service */}
      <section id="camera-rental" ref={rentalRef} className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={rentalInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Camera Rental</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our camera rental service provides you with access to high-quality photography equipment at affordable
                prices. Whether you're a professional photographer or an enthusiast, we have the perfect gear for your
                needs.
              </p>

              <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Wide range of DSLR and mirrorless cameras from top brands",
                  "Professional lenses for every photography style",
                  "Lighting equipment and accessories",
                  "Flexible rental periods from 1 day to several weeks",
                  "Damage protection plans available",
                  "Same-day delivery in select areas",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              >
                <Link href="/products">Browse Equipment</Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={rentalInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image src="/placeholder.svg?height=400&width=600" alt="Camera Rental" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Camera Repair Service */}
      <section id="camera-repair" ref={repairRef} className="py-16 bg-gray-50 relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden shadow-md order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={repairInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image src="/placeholder.svg?height=400&width=600" alt="Camera Repair" fill className="object-cover" />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 50 }}
              animate={repairInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 flex items-center justify-center mr-4">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Camera Repair</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our expert technicians provide professional repair services for all types of cameras and photography
                equipment. With years of experience and specialized tools, we can diagnose and fix most issues quickly
                and efficiently.
              </p>

              <h3 className="text-xl font-semibold mb-3">Our Repair Services</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Lens repair and calibration",
                  "Sensor cleaning and maintenance",
                  "Shutter mechanism repairs",
                  "Electronic and circuit board repairs",
                  "Firmware updates and software issues",
                  "Free diagnostic assessment",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              >
                <Link href="/contact">Request Repair</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Photoshoot Service */}
      <section id="photoshoot" ref={photoshootRef} className="py-16 bg-white relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={photoshootInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 flex items-center justify-center mr-4">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Professional Photoshoot</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our team of professional photographers can capture your special moments with creativity and technical
                excellence. From weddings and events to portraits and commercial photography, we deliver stunning images
                that exceed expectations.
              </p>

              <h3 className="text-xl font-semibold mb-3">Photography Services</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Wedding photography and videography",
                  "Corporate events and conferences",
                  "Product and commercial photography",
                  "Portrait and family photography",
                  "Real estate and architectural photography",
                  "Custom photography packages",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              >
                <Link href="/contact">Book a Photoshoot</Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={photoshootInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Professional Photoshoot"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-300 text-black relative z-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact us today to discuss your photography needs and how we can help you achieve your vision.
          </p>
          <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
