import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Add New Product</h1>
                <p className="text-slate-500 dark:text-slate-400">Add a new item to your rental inventory.</p>
            </div>

            <ProductForm categories={categories} action="create" />
        </div>
    )
}
