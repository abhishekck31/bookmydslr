"use client"

import { motion } from "framer-motion"
import { Camera, Video, ImageIcon } from "lucide-react"
import { useState, useEffect } from "react"

export function CameraAnimation() {
  const [currentIcon, setCurrentIcon] = useState(0)
  const icons = [
    <Camera key="camera" className="h-12 w-12 text-amber-400" />,
    <Video key="video" className="h-12 w-12 text-amber-400" />,
    <ImageIcon key="image" className="h-12 w-12 text-amber-400" />,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-20 w-20 flex items-center justify-center">
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0, opacity: 0, rotate: 180 }}
        transition={{ duration: 0.5 }}
        key={currentIcon}
      >
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 flex items-center justify-center">
          {icons[currentIcon]}
        </div>
      </motion.div>
    </div>
  )
}
