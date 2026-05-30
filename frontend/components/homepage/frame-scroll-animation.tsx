"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const TOTAL_FRAMES = 192

export function FrameScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Use scroll progress for the animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Map progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1])

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        const preloadImages = () => {
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const img = new Image()
                const frameNum = String(i).padStart(3, "0")
                const delay = i % 3 === 1 ? "0.041s" : "0.042s"
                img.src = `/bokmydslr_frames/frame_${frameNum}_delay-${delay}.webp`
                img.onload = () => {
                    loadedCount++
                    if (loadedCount === TOTAL_FRAMES) {
                        setIsLoading(false)
                    }
                }
                loadedImages[i] = img
            }
            setImages(loadedImages)
        }

        preloadImages()
    }, [])

    // Drawing logic
    useEffect(() => {
        if (isMobile || images.length < TOTAL_FRAMES || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        const render = (index: number) => {
            const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(index)))
            const img = images[idx]
            if (!img) return

            // Handle canvas resizing and drawing
            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight

            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr
                canvas.height = height * dpr
                canvas.style.width = `${width}px`
                canvas.style.height = `${height}px`
            }

            context.clearRect(0, 0, canvas.width, canvas.height)

            // Calculate fit
            const imgRatio = img.width / img.height
            const canvasRatio = canvas.width / canvas.height

            let drawWidth = canvas.width
            let drawHeight = canvas.height
            let offsetX = 0
            let offsetY = 0

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio
                offsetY = (canvas.height - drawHeight) / 2
            } else {
                drawWidth = canvas.height * imgRatio
                offsetX = (canvas.width - drawWidth) / 2
            }

            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        }

        // Subscribe to frameIndex changes
        const unsubscribe = frameIndex.on("change", (v) => {
            render(v)
        })

        // Initial render
        render(frameIndex.get() || 0)

        // Handle resize
        const handleResize = () => render(frameIndex.get() || 0)
        window.addEventListener("resize", handleResize)

        return () => {
            unsubscribe()
            window.removeEventListener("resize", handleResize)
        }
    }, [images, frameIndex, isMobile])

    if (isLoading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center">
                {/* Empty black screen during preload */}
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="bg-black py-4 space-y-0">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true, margin: "0px" }}
                        className="w-full h-screen flex items-center justify-center overflow-hidden"
                    >
                        <img
                            src={img.src}
                            alt={`Frame ${i}`}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="relative bg-black"
            style={{ height: `${TOTAL_FRAMES * 5}vh` }}
        >
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />
            </div>
        </div>
    )
}
