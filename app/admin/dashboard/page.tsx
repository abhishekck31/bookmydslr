'use client'

import { useState, useEffect, useCallback } from 'react'
import { CameraSection } from '@/components/admin/camera-section'
import { AccessorySection } from '@/components/admin/accessory-section'
import { PricingSection } from '@/components/admin/pricing-section'
import { ProductTable } from '@/components/admin/product-table'
import { Loader2, LayoutDashboard } from 'lucide-react'

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                fetch('/api/admin/products'),
                fetch('/api/admin/categories') // Assuming this exists or returns basics
            ])

            if (prodRes.ok) {
                const data = await prodRes.json()
                // The API usually returns { products: [...] } or just the array
                setProducts(Array.isArray(data) ? data : data.products || [])
            }

            if (catRes.ok) {
                const data = await catRes.json()
                setCategories(data)
            } else {
                // Fallback categories if API fails or doesn't exist yet
                setCategories([
                    { id: 'cam-cat-id', name: 'Cameras' },
                    { id: 'acc-cat-id', name: 'Accessories' }
                ])
            }
        } catch (error) {
            console.error("Dashboard Fetch Error:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="text-slate-500 font-medium">Loading Dashboard...</p>
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                    <LayoutDashboard className="h-8 w-8 text-amber-500" />
                    Admin Dashboard
                </h1>
                <p className="text-slate-500 mt-2 text-lg">Manage cameras, accessories, pricing & discounts from one place.</p>
            </div>

            {/* Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CameraSection categories={categories} onUpdate={fetchData} />
                <AccessorySection categories={categories} onUpdate={fetchData} />
            </div>

            {/* Pricing Section */}
            <PricingSection />

            {/* Inventory Table */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Live Inventory</h2>
                <ProductTable products={products} onUpdate={fetchData} />
            </div>
        </div>
    )
}
