"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <div
        className={`pointer-events-none absolute inset-0 ${
          theme === "dark" ? "bg-grid-white/[0.05]" : "bg-grid-black/[0.05]"
        } bg-[length:30px_30px]`}
      ></div>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-500 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-500 opacity-20 blur-3xl"></div>

      <motion.div
        className="absolute top-1/4 left-1/3 h-40 w-40 rounded-full bg-amber-300 opacity-20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3 h-40 w-40 rounded-full bg-amber-300 opacity-20 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      ></motion.div>
    </div>
  )
}
