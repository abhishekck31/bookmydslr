"use client"

import dynamic from "next/dynamic"

const LensScroll = dynamic(() => import("./LensScroll"), { ssr: false })

export function LensScrollLoader() {
    return <LensScroll />
}
