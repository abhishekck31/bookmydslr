import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) {
        notFound()
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Edit Product</h1>
                <p className="text-slate-500 dark:text-slate-400">Update product details.</p>
            </div>

            <ProductForm initialData={product} categories={categories} action="update" />
        </div>
    )
}
