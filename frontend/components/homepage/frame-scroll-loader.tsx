"use client"

import dynamic from "next/dynamic"

const FrameScrollAnimation = dynamic(
    () => import("@/components/homepage/frame-scroll-animation").then((mod) => mod.FrameScrollAnimation),
    { ssr: false }
)

export function FrameScrollLoader() {
    return <FrameScrollAnimation />
}
