import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

// Helper function to add timeout to queries
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(`Query timeout after ${timeoutMs}ms`)), timeoutMs)
        ),
    ])
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    try {
        const [product, categories] = await Promise.all([
            withTimeout(
                prisma.product.findUnique({
                    where: { id }
                }),
                8000
            ),
            withTimeout(
                prisma.category.findMany({
                    orderBy: { name: 'asc' }
                }),
                5000
            )
        ])

        if (!product) {
            notFound()
        }

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
    } catch (error) {
        console.error('Error fetching product:', error)
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
                    <p className="text-slate-600 mb-6">Unable to connect to the database. Please check your connection settings.</p>
                    <Link href="/admin/dashboard">
                        <Button>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}
