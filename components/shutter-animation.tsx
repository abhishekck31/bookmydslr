"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ShutterAnimationProps {
  trigger?: boolean
  onComplete?: () => void
}

export function ShutterAnimation({ trigger = false, onComplete }: ShutterAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (trigger && !isAnimating) {
      setIsAnimating(true)

      // Reset animation after completion
      const timer = setTimeout(() => {
        setIsAnimating(false)
        if (onComplete) onComplete()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete, isAnimating])

  return (
    <AnimatePresence>
      {isAnimating && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 15, 30] }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="text-black text-4xl font-bold"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                SNAP!
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
