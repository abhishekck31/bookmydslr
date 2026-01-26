import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Category, Product } from "@/types"

interface QuickSelectGridProps {
    categories: Category[]
    products?: Product[]
}

export function QuickSelectGrid({ categories, products = [] }: QuickSelectGridProps) {
    // Take only the first 8 categories as requested
    const displayCategories = categories.slice(0, 8)

    // Helper to find an image for a category
    const getCategoryImage = (category: Category) => {
        if (category.image) return category.image;
        // Find a product in this category with an image
        const product = products.find(p => p.category?.id === category.id && p.image);
        return product?.image;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <div className="rounded-3xl bg-gray-950 px-6 py-16 sm:px-12">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Popular Categories
                        </h2>
                        <p className="mt-2 text-gray-400">
                            Browse by popular categories
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="hidden items-center text-sm font-medium text-primary hover:underline sm:flex"
                    >
                        View all categories <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {displayCategories.map((category) => {
                        const image = getCategoryImage(category);
                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative overflow-hidden rounded-2xl bg-gray-900 p-4 transition-all hover:ring-2 hover:ring-primary/50"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-800">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={category.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-600">
                                            <span className="text-4xl font-bold opacity-20">{category.name[0]}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex-1 truncate pr-2">
                                        <h3 className="truncate text-lg font-semibold text-white group-hover:text-primary">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Explore items
                                        </p>
                                    </div>
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white transition-colors group-hover:bg-primary">
                                        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="mt-8 flex justify-center sm:hidden">
                    <Link
                        href="/categories"
                        className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        View all categories <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
