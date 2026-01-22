import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProductsTable } from '@/components/admin/products-table'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })

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
