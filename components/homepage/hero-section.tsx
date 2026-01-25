"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Camera, ShieldCheck, Clock, Users, Star, Sparkles } from "lucide-react"

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Camera Models" },
  { value: "4.9/5", label: "Average Rating" },
]

const features = [
  {
    icon: Camera,
    title: "Premium Gear",
    description: "Latest DSLR and mirrorless cameras"
  },
  {
    icon: ShieldCheck,
    title: "Insured",
    description: "Full coverage on all rentals"
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Same-day delivery available"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 customer assistance"
  }
]

// Animated Gradient Blob Component
const AnimatedGradientBlob = ({ className, delay }: { className: string; delay: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-60 ${className}`}
    animate={{
      x: [0, 100, 0],
      y: [0, -100, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 20 + delay * 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
)

// Floating Card Component
const FloatingCard = ({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    {children}
  </motion.div>
)

// Glass Card Component
const GlassCard = ({ icon: Icon, title, description, delay }: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <Icon className="w-8 h-8 text-yellow-600 mb-4" />
    <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
    <p className="text-gray-800 text-sm">{description}</p>
  </motion.div>
)

export function HeroSection() {
  const mousePosition = useMotionValue({ x: 0, y: 0 })

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedGradientBlob
          className="w-[600px] h-[600px] bg-yellow-200/30 -top-48 -left-48"
          delay={0}
        />
        <AnimatedGradientBlob
          className="w-[500px] h-[500px] bg-yellow-100/40 top-1/4 right-0"
          delay={1}
        />
        <AnimatedGradientBlob
          className="w-[400px] h-[400px] bg-amber-100/30 bottom-0 left-1/4"
          delay={2}
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5f12_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5f12_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-12 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="px-4 py-2 text-sm bg-yellow-100 border-yellow-300 text-yellow-800">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                #1 Camera Rental in Bangalore
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-black">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  Rent Premium
                </span>
                <br />
                <span className="text-black">Camera Gear</span>
              </h1>
              <p className="text-xl text-gray-800 max-w-lg leading-relaxed">
                Access professional photography and videography equipment at affordable prices.
                From DSLRs to cinema cameras, we've got you covered.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full transition-all shadow-lg hover:shadow-yellow-500/25 group"
                asChild
              >
                <Link href="/rental-equipment">
                  Browse Equipment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-yellow-300 text-black hover:bg-yellow-50 rounded-full"
                asChild
              >
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-3xl font-bold text-yellow-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-8"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
                <span className="ml-2 text-black font-semibold">4.9/5</span>
                <span className="text-gray-600 text-sm ml-1">(2,500+ reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Main Camera Image */}
            <FloatingCard delay={0.3} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-yellow-100/50 rounded-3xl blur-xl" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src="/sonya7III.png"
                    alt="Professional Camera"
                    width={320}
                    height={320}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </div>
            </FloatingCard>

            {/* Feature Cards */}
            <FloatingCard delay={0.5} className="top-8 right-8 w-72">
              <div className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-black font-semibold">Sony Alpha a7 III</h3>
                    <p className="text-yellow-600 text-sm">Available Now</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-1">₹1,200<span className="text-sm text-gray-600 font-normal">/day</span></div>
                <div className="flex gap-2">
                  <Badge className="text-xs bg-green-100 text-green-800 border-green-300">In Stock</Badge>
                  <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">Popular</Badge>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.7} className="bottom-16 left-8 w-64">
              <div className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <h3 className="text-black font-semibold">Fully Insured</h3>
                </div>
                <p className="text-gray-800 text-sm">All equipment comes with comprehensive insurance coverage</p>
              </div>
            </FloatingCard>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-yellow-200 rounded-full"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-yellow-100 rounded-full"
            />
          </motion.div>
        </div>

        {/* Bottom Feature Cards - Mobile Visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 lg:hidden"
        >
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.8 + index * 0.1}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}
