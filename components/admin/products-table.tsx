'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from 'sonner'
import { DeleteProductButton } from '@/components/admin/delete-product-button'

interface Product {
    id: string
    name: string
    category: {
        name: string
    }
    price: number
    isAvailable: boolean
    image: string | null
}

interface ProductsTableProps {
    products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
    const router = useRouter()
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [isDeleting, setIsDeleting] = useState(false)

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(products.map(p => p.id))
        }
    }

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    const handleBatchDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch('/api/admin/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: selectedIds }),
            })

            if (res.ok) {
                toast.success(`${selectedIds.length} products deleted successfully`)
                setSelectedIds([])
                router.refresh()
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to delete products')
            }
        } catch (error) {
            console.error('Batch delete error:', error)
            toast.error('Something went wrong')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                >
                    {products.length > 0 && selectedIds.length === products.length
                        ? 'Deselect All'
                        : 'Select All'}
                </Button>
            </div>

            {selectedIds.length > 0 && (
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedIds.length} selected</span>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBatchDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : (
                            <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected
                            </>
                        )}
                    </Button>
                </div>
            )}

            <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={products.length > 0 && selectedIds.length === products.length}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price / Day</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} data-state={selectedIds.includes(product.id) && "selected"}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(product.id)}
                                        onCheckedChange={() => toggleSelect(product.id)}
                                        aria-label={`Select ${product.name}`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="h-12 w-12 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                                        <img
                                            src={product.image || '/placeholder.png'}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-900 dark:text-slate-100">{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.isAvailable ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {product.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
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
                                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
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
