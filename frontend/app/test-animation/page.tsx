import { FrameScrollAnimation } from "@/components/homepage/frame-scroll-animation"

export default function TestPage() {
    return (
        <main>
            <div className="h-screen flex items-center justify-center bg-gray-100 text-black">
                <h1>Scroll Down to Test Animation</h1>
            </div>
            <FrameScrollAnimation />
            <div className="h-screen flex items-center justify-center bg-gray-100 text-black">
                <h1>End of Animation</h1>
            </div>
        </main>
    )
}
