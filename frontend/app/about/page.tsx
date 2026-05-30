"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, Users, Award, Camera, Clapperboard, CheckCircle2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema"

export default function AboutPage() {
    return (
        <>
            <JsonLd
                data={[
                    buildCollectionPageSchema({
                        name: "About Book My DSLR | Camera Rental Bangalore",
                        description:
                            "Learn about Book My DSLR, the Bangalore camera rental team helping creators, photographers, and filmmakers access professional gear.",
                        path: "/about",
                    }),
                    buildBreadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                    ]),
                ]}
            />
            <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-24 md:pt-40 md:pb-40 overflow-hidden bg-slate-950 border-b border-white/5">
                {/* Abstract Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                </div>

                <div className="container-premium relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 mb-8 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Since 2015</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                            Empowering Creators <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 animate-gradient-x">
                                With Pro Gear
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                            We bridge the gap between your creative vision and professional reality.
                            Bangalore's most trusted camera rental service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Button size="lg" className="h-14 px-10 bg-white hover:bg-amber-50 text-slate-900 font-bold rounded-full text-lg shadow-lg shadow-white/5 transition-all hover:scale-105">
                                Explore Our Inventory
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-10 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full text-lg backdrop-blur-sm bg-white/5 transition-all">
                                Read Our Story
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-b border-gray-100 bg-white">
                <div className="container-premium">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Happy Clients", value: "5k+", icon: Users },
                            { label: "Gear Items", value: "350+", icon: Camera },
                            { label: "Years Experience", value: "8+", icon: Award },
                            { label: "Shoot Days", value: "12k+", icon: Clapperboard },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center group">
                                <div className="w-16 h-16 rounded-3xl bg-gray-50 mb-6 flex items-center justify-center text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-all duration-500">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{stat.value}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission / Story */}
            <section className="py-24 md:py-32 overflow-hidden">
                <div className="container-premium">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 relative shadow-2xl shadow-slate-200">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                                <Image
                                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                                    alt="Camera Lens"
                                    fill
                                    className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                                    <div className="w-12 h-1 bg-amber-50 mb-6"></div>
                                    <p className="text-3xl font-serif italic leading-relaxed text-slate-100">
                                        "Photography is the story I fail to put into words."
                                    </p>
                                    <p className="mt-6 font-bold text-amber-400 uppercase tracking-widest text-sm">— Destin Sparks</p>
                                </div>
                            </div>
                            <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border-2 border-gray-100 rounded-[2.5rem]"></div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                                We Believe Equipment Should Never Limit <span className="text-slate-400">Creativity.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                                <p>
                                    Started in a small garage in Koramangala, <strong className="text-slate-900 font-semibold">Book My DSLR</strong> was born from a simple frustration:
                                    professional camera gear was either too expensive to buy or too complicated to rent.
                                </p>
                                <p>
                                    Today, we are Bangalore's premier rental house, serving everyone from student filmmakers
                                    to commercial production houses. Our inventory is meticulously maintained, and our
                                    team consists of photographers who understand your needs.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-12">
                                {[
                                    "Cinema-Grade Maintenance",
                                    "No Hidden Fees",
                                    "Expert Gear Consultations",
                                    "Flexible Rental Plans"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-amber-50/50 transition-colors group">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-slate-700 font-medium group-hover:text-amber-800 transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact" className="inline-block">
                                <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-black h-14 px-10 text-lg shadow-xl shadow-slate-900/20 group transition-all hover:scale-105">
                                    Get in Touch <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-slate-50 border-t border-gray-200">
                <div className="container-premium">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-4 block">Our DNA</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Why Choose Book My DSLR?</h2>
                        <p className="text-lg text-slate-500">We don't just rent cameras; we partner in your production success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Quality Obsessed",
                                desc: "Every sensor cleaned, every lens calibrated. We don't rent out anything we wouldn't use ourselves on a paid shoot.",
                                icon: ShieldCheck
                            },
                            {
                                title: "Speed & Reliability",
                                desc: "Last minute shoot? No problem. Our streamlined verification process gets you gear effectively instantly.",
                                icon: Truck
                            },
                            {
                                title: "Community First",
                                desc: "We support local workshops, student films, and photo walks. We believe in growing the Bangalore creative ecosystem.",
                                icon: Users
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <card.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </main>
        </>
    )
}
