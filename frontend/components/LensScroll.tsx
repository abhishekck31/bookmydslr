"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

const TOTAL_FRAMES = 152
const SECTION_HEIGHT_VH = 400
const FALLBACK_FRAME = "/bookmydslr_frames/frame_000.png"
const WATERMARK_CROP_PX = 15

// Quotes configuration
const QUOTES_NORMALIZED = [
    { text: "Every great photograph begins with", highlight: "precision", suffix: "." },
    { text: "A lens is not glass — it’s", highlight: "vision", suffix: "." },
    { text: "Light enters.", highlight: "Stories", suffix: "emerge." },
    { text: "", highlight: "Craft", suffix: "the moment before you capture it." },
    { text: "", highlight: "Details", suffix: "define the difference." },
    { text: "Because every", highlight: "frame", suffix: "matters." }
]


export default function LensScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [activeQuoteIndex, setActiveQuoteIndex] = useState(0)

    // Mobile Viewport State
    const [mobileFixedState, setMobileFixedState] = useState<'absolute-top' | 'fixed' | 'absolute-bottom'>('absolute-top')

    // Image cache
    const imagesRef = useRef<(HTMLImageElement | null)[]>([])

    useEffect(() => {
        if (typeof window === "undefined") return
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const { scrollY } = useScroll()
    const scrollProgress = useMotionValue(0)

    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    })

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1])

    // Manual Scroll & Mobile Fixed Logic
    useEffect(() => {
        if (!containerRef.current) return

        const updateProgress = () => {
            if (!containerRef.current) return
            const element = containerRef.current
            const rect = element.getBoundingClientRect()
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const elementTop = rect.top + scrollTop
            const scrollDistance = element.offsetHeight - window.innerHeight

            // Prevent divide by zero
            if (scrollDistance <= 0) return

            const currentScroll = window.scrollY - elementTop
            let progress = currentScroll / scrollDistance

            progress = Math.max(0, Math.min(1, progress))
            scrollProgress.set(progress)

            // MOBILE: Handle "Manual Sticky" (Fixed positioning)
            if (isMobile) {
                // If before section
                if (currentScroll < 0) {
                    setMobileFixedState('absolute-top')
                }
                // If after section
                else if (currentScroll > scrollDistance) {
                    setMobileFixedState('absolute-bottom')
                }
                // Inside section
                else {
                    setMobileFixedState('fixed')
                }
            }
        }

        updateProgress()
        window.addEventListener("scroll", updateProgress, { passive: true })
        window.addEventListener("resize", updateProgress)

        return () => {
            window.removeEventListener("scroll", updateProgress)
            window.removeEventListener("resize", updateProgress)
        }
    }, [scrollY, isMobile, scrollProgress])

    // Preload
    useEffect(() => {
        if (typeof window === "undefined") return

        const loadImages = async () => {
            if (imagesRef.current.length === TOTAL_FRAMES && imagesRef.current[0]) return

            imagesRef.current = new Array(TOTAL_FRAMES).fill(null)

            // Force load frame 0
            const img0 = new Image()
            img0.src = FALLBACK_FRAME
            img0.onload = () => { imagesRef.current[0] = img0 }
            img0.onerror = (e) => { console.error("Frame 0 failed to load", e) }

            // Load all frames
            setTimeout(() => {
                for (let i = 1; i < TOTAL_FRAMES; i++) {
                    const img = new Image()
                    const frameNum = String(i).padStart(3, "0")
                    img.src = `/bookmydslr_frames/frame_${frameNum}.png`

                    img.onload = () => { imagesRef.current[i] = img }
                    img.onerror = () => {
                        if (imagesRef.current[0]) imagesRef.current[i] = imagesRef.current[0]
                    }
                }
            }, 100)
        }

        loadImages()
    }, [])

    // Render & Quote Logic
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        const render = (val: number) => {
            const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(val)))

            // Update Active Quote
            const quoteIdx = Math.min(QUOTES_NORMALIZED.length - 1, Math.floor(idx / (TOTAL_FRAMES / QUOTES_NORMALIZED.length)))
            setActiveQuoteIndex((prev) => {
                if (prev !== quoteIdx) return quoteIdx
                return prev
            })

            let img = imagesRef.current[idx]
            if (!img && imagesRef.current[0]) img = imagesRef.current[0]

            const dpr = window.devicePixelRatio || 1
            // Use visualViewport if available for mobile accuracy
            const width = window.visualViewport ? window.visualViewport.width : window.innerWidth
            const height = window.visualViewport ? window.visualViewport.height : window.innerHeight

            // Force resize if dimensions change
            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr
                canvas.height = height * dpr
                context.resetTransform()
            }

            context.fillStyle = "black"
            context.fillRect(0, 0, canvas.width, canvas.height)

            if (!img || img.width === 0) return

            // Source Dimensions (Cropped)
            const sx = 0
            const sy = 0
            const sWidth = img.width
            const sHeight = Math.max(1, img.height - WATERMARK_CROP_PX)

            // Calculate Ratios for COVER (Full Bleed)
            const imgRatio = sWidth / sHeight
            const canvasRatio = canvas.width / canvas.height

            let drawWidth, drawHeight, offsetX, offsetY

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width
                drawHeight = canvas.width / imgRatio
            } else {
                drawHeight = canvas.height
                drawWidth = canvas.height * imgRatio
            }

            offsetX = (canvas.width - drawWidth) / 2
            offsetY = (canvas.height - drawHeight) / 2

            context.drawImage(img, sx, sy, sWidth, sHeight, offsetX, offsetY, drawWidth, drawHeight)
        }

        const unsubscribe = frameIndex.on("change", (v) => render(v))

        let rafId: number
        const loop = () => {
            render(frameIndex.get() || 0)
            rafId = requestAnimationFrame(loop)
        }
        rafId = requestAnimationFrame(loop)

        return () => {
            unsubscribe()
            cancelAnimationFrame(rafId)
        }
    }, [frameIndex])

    // Mobile Fixed Styles
    const mobileContainerStyle: React.CSSProperties = isMobile ? {
        position: mobileFixedState === 'fixed' ? 'fixed' : 'absolute',
        top: mobileFixedState === 'absolute-bottom' ? 'auto' : 0,
        bottom: mobileFixedState === 'absolute-bottom' ? 0 : 'auto',
        left: 0,
        width: '100%',
        height: '100vh', // Force viewport height
        zIndex: 10
    } : {}

    // Desktop uses Sticky
    const desktopClassName = !isMobile ? "sticky top-0 left-0 w-full h-screen overflow-hidden bg-black z-10" : ""

    return (
        <div
            ref={containerRef}
            className="relative bg-black w-full"
            style={{ height: `${SECTION_HEIGHT_VH}vh` }}
        >
            <div
                className={desktopClassName}
                style={isMobile ? mobileContainerStyle : undefined}
            >
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    style={{ width: '100%', height: '100%' }}
                />

                {/* Quotes Overlay */}
                <div className="absolute inset-x-0 bottom-24 z-20 flex justify-center px-4 pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeQuoteIndex}
                            initial={{ opacity: 0, y: 12, letterSpacing: "-0.02em" }}
                            animate={{ opacity: 1, y: 0, letterSpacing: "normal" }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-center max-w-4xl"
                        >
                            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90 drop-shadow-2xl">
                                {QUOTES_NORMALIZED[activeQuoteIndex].text}{" "}
                                <span className="text-primary font-semibold">
                                    {QUOTES_NORMALIZED[activeQuoteIndex].highlight}
                                </span>
                                {QUOTES_NORMALIZED[activeQuoteIndex].suffix && " " + QUOTES_NORMALIZED[activeQuoteIndex].suffix}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
