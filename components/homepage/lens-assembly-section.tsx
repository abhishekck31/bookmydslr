"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const quotes = [
  "Every great photograph begins with <span class='text-yellow-500 font-semibold'>precision</span>.",
  "A lens is not glass — it's <span class='text-yellow-500 font-semibold'>vision</span>.",
  "Light enters. Stories emerge.",
  "Craft the moment before you capture it.",
  "Details define the difference.",
  "Because every frame matters."
]

const TOTAL_FRAMES = 192

export function LensAssemblySection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      const delta = e.deltaY
      const scrollStep = 100 / TOTAL_FRAMES
      const newProgress = Math.max(0, Math.min(TOTAL_FRAMES - 1, 
        scrollProgress + (delta > 0 ? 1 : -1) * scrollStep
      ))
      
      setScrollProgress(newProgress)
      
      // Update quote based on scroll progress
      const quoteIndex = Math.floor((newProgress / TOTAL_FRAMES) * quotes.length)
      setCurrentQuote(quoteIndex)
    }

    const handleScroll = (e: Event) => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY.current
      lastScrollY.current = scrollY
      
      if (Math.abs(delta) > 50) {
        const scrollStep = 100 / TOTAL_FRAMES
        const newProgress = Math.max(0, Math.min(TOTAL_FRAMES - 1, 
          scrollProgress + (delta > 0 ? 1 : -1) * scrollStep
        ))
        
        setScrollProgress(newProgress)
        
        // Update quote based on scroll progress
        const quoteIndex = Math.floor((newProgress / TOTAL_FRAMES) * quotes.length)
        setCurrentQuote(quoteIndex)
      }
    }

    // Lock scroll when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsLocked(entry.isIntersecting)
          if (entry.isIntersecting) {
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = ''
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(container)

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      document.body.style.overflow = ''
    }
  }, [scrollProgress])

  const currentFrame = Math.floor(scrollProgress)
  const frameNumber = String(currentFrame).padStart(3, '0')

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden",
        "flex items-center justify-center"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        
        {/* Moving light rays */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Lens Frame Container */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFrame}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1,
                rotate: 2,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={`/bokmydslr_frames/frame_${frameNumber}_delay-0.042s.webp`}
                alt={`Lens assembly frame ${currentFrame}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quote Display */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="mt-12 md:mt-16 max-w-lg text-center"
        >
          <div 
            className="text-white text-lg md:text-xl font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: quotes[currentQuote] }}
          />
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: TOTAL_FRAMES }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentFrame 
                  ? "bg-yellow-500 w-8" 
                  : "bg-white/20 w-2"
              )}
            />
          ))}
        </div>

        {/* Scroll Instructions */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 left-4 text-white/60 text-sm"
          >
            Scroll to assemble
          </motion.div>
        )}
      </div>

      {/* Scroll Lock Indicator */}
      {isLocked && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 text-white/60">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-sm">Scroll Locked</span>
        </div>
      )}
    </section>
  )
}
