import { fetchAPI } from "@/lib/api"
import { Product, Category } from "@/types"
import { ProductForm } from '@/components/admin/product-form'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const product = await fetchAPI<Product>(`/products/${id}`)

    if (!product) {
        notFound()
    }

    const categories = await fetchAPI<Category[]>('/categories') || []

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link href="/admin/dashboard">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Edit Product</h1>
                <p className="text-slate-500 dark:text-slate-400">Update product details.</p>
            </div>

            <ProductForm initialData={product} categories={categories} action="update" />
        </div>
    )
}
