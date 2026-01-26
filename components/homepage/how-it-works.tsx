"use client"

import { motion } from "framer-motion"
import { Search, CalendarCheck, Camera, CornerDownRight } from "lucide-react"

const steps = [
    {
        id: "01",
        title: "Browse & Select",
        description: "Explore our extensive inventory of high-end cameras and lenses.",
        icon: Search
    },
    {
        id: "02",
        title: "Book Dates",
        description: "Choose your rental duration. Checking availability is instant.",
        icon: CalendarCheck
    },
    {
        id: "03",
        title: "Pickup or Delivery",
        description: "Collect from our store or get safe doorstep delivery.",
        icon: Camera
    },
    {
        id: "04",
        title: "Shoot & Return",
        description: "Create magic. Return the gear when you're done. Simple.",
        icon: CornerDownRight
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-gray-950 text-white overflow-hidden relative rounded-[3rem] mx-2 md:mx-4 my-4 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-amber-900/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-yellow-900/30 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
                    <div className="md:w-1/3 sticky top-24">
                        <span className="text-amber-500/80 font-bold tracking-widest text-xs uppercase mb-3 block">Simple Process</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight tracking-tight text-white">
                            Rent in <br /> 4 Easy Steps
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                            Book premium equipment in minutes. No paperwork headaches, just swift service.
                        </p>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                className="relative pl-6 border-l border-gray-800"
                            >
                                <span className="absolute -left-[13px] top-0 flex items-center justify-center w-[26px] h-[26px] rounded-full bg-gray-900 border-2 border-gray-800 text-gray-500 text-[10px] font-bold">
                                    {/* Dot */}
                                </span>

                                <div className="mb-3 inline-block p-2.5 rounded-lg bg-gray-900/80 border border-gray-800 text-amber-500/90">
                                    <step.icon className="w-5 h-5" />
                                </div>

                                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-100">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
