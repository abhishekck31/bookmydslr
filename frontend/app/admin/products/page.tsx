'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchProducts } from "@/lib/api"
import { Product } from "@/types"
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'
import { ProductsTable } from '@/components/admin/products-table'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data || [])
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Products</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your rental inventory</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <ProductsTable products={products} />
        </div>
    )
}
