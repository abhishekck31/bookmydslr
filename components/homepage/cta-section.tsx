"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-20 relative overflow-hidden bg-black rounded-[3rem] mx-2 md:mx-4 my-4 shadow-2xl">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 opacity-60" />

            {/* Texture/Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        Ready to Capture <br /> Your Masterpiece?
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed font-medium">
                        Join thousands of photographers who trust Book My DSLR for their gear.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold rounded-full">
                            <Link href="/rental-equipment">
                                Start Renting Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-full">
                            <Link href="/contact">
                                Contact Support
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
