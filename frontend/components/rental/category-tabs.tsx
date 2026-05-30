import Link from "next/link"
import { Category } from "@/types"
import { cn } from "@/lib/utils"
import { Camera, Video, Zap, Battery, Disc } from "lucide-react"

interface CategoryTabsProps {
    categories: Category[]
    activeSlug: string
}

// Map icons to category names (simple heuristic or manual mapping)
const getIcon = (name: string) => {
    const lower = name.toLowerCase()
    if (lower.includes("dslr")) return Camera
    if (lower.includes("mirrorless")) return Camera
    if (lower.includes("gopro") || lower.includes("insta360")) return Video
    if (lower.includes("lens")) return Disc
    if (lower.includes("flash") || lower.includes("lighting")) return Zap
    if (lower.includes("battery")) return Battery
    return Camera
}

export function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
    return (
        <div className="w-full overflow-x-auto pb-4 no-scrollbar">
            <div className="flex gap-4 min-w-max px-1">
                {categories.map((category) => {
                    const Icon = getIcon(category.name)
                    const isActive = category.slug === activeSlug

                    return (
                        <Link
                            key={category.id}
                            href={`/rental-equipment/${category.slug}`}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 font-medium",
                                isActive
                                    ? "bg-amber-400 border-amber-400 text-black shadow-md"
                                    : "bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{category.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
