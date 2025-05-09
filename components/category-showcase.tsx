"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Camera, Aperture, Smartphone, Mic, Battery, Zap, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = [
  {
    name: "DSLR Cameras",
    icon: <Camera className="h-6 w-6" />,
    path: "/products/camera",
    color: "from-amber-500 to-yellow-300",
    description: "Professional DSLR cameras from Canon, Nikon, and more",
  },
  {
    name: "Mirrorless Cameras",
    icon: <Aperture className="h-6 w-6" />,
    path: "/products/mirrorless",
    color: "from-amber-500 to-yellow-300",
    description: "Modern mirrorless cameras from Sony, Canon, and Nikon",
  },
  {
    name: "Action Cameras",
    icon: <Smartphone className="h-6 w-6" />,
    path: "/products/action-camera",
    color: "from-amber-500 to-yellow-300",
    description: "GoPro, Insta360, and other action cameras",
  },
  {
    name: "Camera Lenses",
    icon: <Aperture className="h-6 w-6" />,
    path: "/products/canon-lenses",
    color: "from-amber-500 to-yellow-300",
    description: "Wide range of lenses for all camera types",
  },
  {
    name: "Gimbals",
    icon: <Layers className="h-6 w-6" />,
    path: "/products/gimbal",
    color: "from-amber-500 to-yellow-300",
    description: "DJI, Zhiyun, and other camera stabilizers",
  },
  {
    name: "Tripods",
    icon: <Layers className="h-6 w-6" />,
    path: "/products/tripod",
    color: "from-amber-500 to-yellow-300",
    description: "Professional tripods and monopods",
  },
  {
    name: "Microphones",
    icon: <Mic className="h-6 w-6" />,
    path: "/products/mic-recorder",
    color: "from-amber-500 to-yellow-300",
    description: "Wireless mics, shotgun mics, and recorders",
  },
  {
    name: "Lighting",
    icon: <Zap className="h-6 w-6" />,
    path: "/products/flash-light",
    color: "from-amber-500 to-yellow-300",
    description: "LED lights, flash units, and lighting accessories",
  },
  {
    name: "Batteries",
    icon: <Battery className="h-6 w-6" />,
    path: "/products/battery",
    color: "from-amber-500 to-yellow-300",
    description: "Camera batteries and power accessories",
  },
  {
    name: "All Products",
    icon: <Layers className="h-6 w-6" />,
    path: "/products",
    color: "from-amber-500 to-yellow-300",
    description: "Browse our complete collection of equipment",
  },
  {
    name: "Drones",
    icon: <YourDroneIcon className="h-6 w-6" />,
    path: "/products/drone",
    color: "from-amber-500 to-yellow-300",
    description: "DJI drones for aerial photography and videography",
  },
]

export function CategoryShowcase() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">
            Browse By Category
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Find the perfect equipment for your next shoot</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="relative"
          >
            <Link href={category.path}>
              <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer h-full bg-white dark:bg-gray-800">
                <div
                  className={cn(
                    "h-16 w-16 rounded-full bg-gradient-to-r text-white flex items-center justify-center mb-4 transform transition-all duration-300",
                    category.color,
                    hoveredCategory === category.name ? "scale-110" : "",
                  )}
                >
                  {category.icon}
                </div>
                <span className="text-base font-medium text-center mb-1">{category.name}</span>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredCategory === category.name ? 1 : 0,
                    height: hoveredCategory === category.name ? "auto" : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">{category.description}</p>
                </motion.div>

                <motion.div
                  className="absolute bottom-2 right-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCategory === category.name ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Layers className="h-4 w-4 text-amber-500" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
