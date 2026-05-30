"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Coins, MapPin, Clock } from "lucide-react"

const features = [
    {
        icon: ShieldCheck,
        title: "100% Verified Gear",
        description: "Every commercial camera and lens is tested and serviced before rental to ensure flawless performance."
    },
    {
        icon: Coins,
        title: "Unbeatable Prices",
        description: "Premium equipment at the most competitive daily rental rates in Bangalore. No hidden deposits."
    },
    {
        icon: MapPin,
        title: "Prime Locations",
        description: "Easy pickup from our studio in Kalyan Nagar. Fast delivery options across Bangalore."
    },
    {
        icon: Clock,
        title: "Flexible Rentals",
        description: "Rent for a day, a week, or a month. Extension options available with simple phone call."
    }
]

export function WhyUs() {
    return (
        <section className="py-20 bg-gray-50/50 rounded-[3rem] mx-2 md:mx-4 my-4">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why Choose Us?</h2>
                    <p className="text-base text-gray-600 leading-relaxed font-medium">
                        We are Bangalore's most trusted camera rental service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                            className="p-6 rounded-xl bg-white border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors duration-300">
                                <feature.icon className="w-5 h-5 text-gray-700 group-hover:text-amber-700 transition-colors duration-300" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
