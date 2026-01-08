"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    }

    return (
        <section className="relative min-h-[75vh] flex items-end pb-20 pt-32 lg:pb-0 lg:pt-0 lg:items-center bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex flex-col space-y-5"
                    >
                        <motion.div variants={fadeUpVariant} className="inline-block">
                            <span className="bg-amber-50 text-amber-900/80 text-xs font-semibold px-3 py-1 rounded-full border border-amber-100/50">
                                #1 Camera Rental in Bangalore
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                            Rent Professional <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                                Cameras & Gear
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUpVariant} className="text-base sm:text-lg text-gray-600 max-w-[540px] leading-relaxed font-medium">
                            Experience photography without limits. Rent top-tier DSLR and Mirrorless cameras, lenses, and
                            accessories at unbeatable prices. No hidden fees.
                        </motion.p>

                        <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-3 pt-2">
                            <Button asChild size="lg" className="h-11 px-6 text-sm font-medium bg-black hover:bg-gray-900 text-white rounded-full transition-all shadow-sm hover:shadow-md">
                                <Link href="/products">
                                    Browse Gear <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm font-medium border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-full bg-white">
                                <Link href="#how-it-works">How it works</Link>
                            </Button>
                        </motion.div>

                        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 pt-2 text-sm text-gray-500 font-medium">
                            <p className="text-xs sm:text-sm">Trusted by 1000+ Customers</p>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
                    >
                        <div className="relative w-full max-w-[500px] aspect-square">
                            {/* Abstract Background Blobs - Reduced Blur/Size */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-[60px]" />

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="relative z-10 w-full h-full"
                            >
                                <Image
                                    src="/sonya7III.png"
                                    alt="Professional Camera"
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    priority
                                />
                            </motion.div>

                            {/* Floating Elements - Subtle motion */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-16 -left-2 md:left-4 bg-white/80 backdrop-blur-md border border-white/20 p-3 rounded-lg shadow-lg z-20 max-w-[160px]"
                            >
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] uppercase tracking-wide font-bold text-gray-500">Available Now</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 leading-tight">Sony Alpha a7 III</p>
                                <p className="text-xs text-gray-500 font-medium">₹1,200/day</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
