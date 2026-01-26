"use client"

import Link from "next/link"
import Image from "next/image"

const brands = [
    {
        name: "Canon",
        logo: "https://logos-world.net/wp-content/uploads/2020/08/Canon-Symbol.png",
        href: "/rental-equipment/cameras?subcategory=canon",
        color: "text-red-600"
    },
    {
        name: "Nikon",
        logo: "/nikonlogo.png",
        href: "/rental-equipment/cameras?subcategory=nikon",
        color: "text-yellow-500"
    },
    {
        name: "Sony",
        logo: "https://images.seeklogo.com/logo-png/12/2/sony-logo-png_seeklogo-129420.png",
        href: "/rental-equipment/cameras?subcategory=sony",
        color: "text-black"
    },
    {
        name: "OTHERS",
        href: "/rental-equipment/cameras",
        isText: true
    },
    {
        name: "ALL",
        href: "/rental-equipment",
        isText: true
    }
]

export function BrandSelection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Camera Brands
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {brands.map((brand) => (
                    <Link
                        key={brand.name}
                        href={brand.href}
                        className="group relative flex aspect-square flex-col items-center justify-center rounded-3xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-100"
                    >
                        {brand.isText ? (
                            <span className="text-xl font-black tracking-wider text-gray-900 group-hover:text-amber-500 transition-colors">
                                {brand.name}
                            </span>
                        ) : (
                            <div className="relative h-24 w-full">
                                <Image
                                    src={brand.logo!}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </section>
    )
}
