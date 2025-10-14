"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-amber-500 to-yellow-300 py-16 md:py-24">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Rent Professional Camera Equipment
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get access to high-quality cameras, lenses, and accessories without the high cost of ownership.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                <Link href="/products">Browse Equipment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-amber-600 hover:bg-gray-100">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/heroimg.png"
              alt="Professional camera equipment"
              width={500}
              height={320}
              className="mx-auto rounded-2xl h-52 object-cover"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}