'use client'

import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Camera, Package, Loader2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner'
import { useState } from 'react'

interface Product {
    id: string
    name: string
    brand: string | null
    type: string | null
    price: number
    isAvailable: boolean
    category: {
        name: string
    }
}

export function ProductTable({ products, onUpdate }: { products: Product[], onUpdate: () => void }) {
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return

        setDeletingId(id)
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Product removed')
                onUpdate()
            } else {
                toast.error('Failed to delete')
            }
        } catch (error) {
            toast.error('Error deleting product')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <Card className="border-slate-200 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-lg">Live Inventory</CardTitle>
                <CardDescription>Cameras and accessories currently active in the database</CardDescription>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50">
                        <TableHead className="w-[300px]">Item Details</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Specs</TableHead>
                        <TableHead>Price / Day</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center shrink-0">
                                        {product.category.name === 'Cameras' ? <Camera className="h-5 w-5 text-slate-400" /> : <Package className="h-5 w-5 text-slate-400" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900">{product.name}</span>
                                        <span className="text-xs text-slate-500">{product.brand || 'No Brand'}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm font-medium text-slate-600">{product.category.name}</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm text-slate-500">{product.type || '--'}</span>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-slate-900">₹{product.price}</span>
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.isAvailable ? 'Active' : 'Inactive'}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                                        onClick={() => handleDelete(product.id, product.name)}
                                        disabled={deletingId === product.id}
                                    >
                                        {deletingId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {products.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-slate-400">
                                No inventory items found. Add cameras or accessories above.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}


