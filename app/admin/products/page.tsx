import Link from 'next/link'
import { DeleteProductButton } from '@/components/admin/delete-product-button'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

            <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Image</TableHead>
                            <TableHead className="w-48 max-w-48">Name</TableHead>
                            <TableHead className="w-28">Category</TableHead>
                            <TableHead className="w-24">Price / Day</TableHead>
                            <TableHead className="w-20">Status</TableHead>
                            <TableHead className="w-20 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="py-2">
                                    <div className="h-12 w-12 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                                        {/* Use proper Next Image in prod, simple img for now to avoid domain config issues */}
                                        <img
                                            src={product.image || '/placeholder.png'}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-900 dark:text-slate-100 py-2">
                                    <div className="truncate max-w-44" title={product.name}>
                                        {product.name}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2">{product.category.name}</TableCell>
                                <TableCell className="py-2">₹{product.price}</TableCell>
                                <TableCell className="py-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.isAvailable ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {product.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right py-2">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </Link>
                                        <DeleteProductButton id={product.id} name={product.name} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                    No products found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
