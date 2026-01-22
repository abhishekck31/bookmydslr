'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Camera, Package, Loader2, Search, X, Filter } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner'
import { useState, useMemo } from 'react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface Product {
    id: string
    name: string
    brand: string | null
    type: string | null
    price: number
    image: string | null
    isAvailable: boolean
    discountPercentage: number | null
    offerName: string | null
    category: {
        name: string
    } | null
}

interface ProductTableProps {
    products: Product[]
    onUpdate: () => void
    categories?: Array<{ id: string; name: string }>
}

export function ProductTable({ products, onUpdate, categories = [] }: ProductTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [togglingId, setTogglingId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [productToDelete, setProductToDelete] = useState<{ id: string, name: string } | null>(null)

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products]

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(term) ||
                p.brand?.toLowerCase().includes(term) ||
                p.type?.toLowerCase().includes(term)
            )
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category?.name === selectedCategory)
        }

        // Status filter
        if (selectedStatus !== 'all') {
            const isActive = selectedStatus === 'active'
            filtered = filtered.filter(p => p.isAvailable === isActive)
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name)
                case 'name-desc':
                    return b.name.localeCompare(a.name)
                case 'price-low':
                    return a.price - b.price
                case 'price-high':
                    return b.price - a.price
                case 'newest':
                    return 0 // Already sorted by updatedAt from API
                case 'oldest':
                    return 0
                default:
                    return 0
            }
        })

        return filtered
    }, [products, searchTerm, selectedCategory, selectedStatus, sortBy])

    // Get unique categories from products
    const uniqueCategories = useMemo(() => {
        const cats = new Set(products.map(p => p.category?.name).filter(Boolean))
        return Array.from(cats).map(name => ({
            id: name || '',
            name: name || ''
        }))
    }, [products])

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedCategory('all')
        setSelectedStatus('all')
        setSortBy('newest')
    }

    const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || selectedStatus !== 'all' || sortBy !== 'newest'

    const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
        setTogglingId(id)
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isAvailable: !currentStatus })
            })
            if (res.ok) {
                toast.success(`Product ${!currentStatus ? 'activated' : 'deactivated'}`)
                onUpdate()
            } else {
                toast.error('Failed to update availability')
            }
        } catch (error) {
            toast.error('Error updating availability')
        } finally {
            setTogglingId(null)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        setProductToDelete({ id, name })
        setShowAlertDialog(true)
    }

    const confirmDelete = async () => {
        if (!productToDelete) return
        
        setDeletingId(productToDelete.id)
        try {
            const res = await fetch(`/api/admin/products/${productToDelete.id}`, { method: 'DELETE' })
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
            setShowAlertDialog(false)
            setProductToDelete(null)
        }
    }

    return (
        <>
        <Card className="border-slate-200 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Live Inventory</CardTitle>
                        <CardDescription>Cameras and accessories currently active in the database</CardDescription>
                    </div>
                    <div className="text-sm text-slate-500">
                        {filteredAndSortedProducts.length} of {products.length} items
                    </div>
                </div>
            </CardHeader>

            {/* Search and Filter Bar */}
            <div className="p-4 border-b border-slate-100 bg-white">
                <div className="flex flex-col gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name, brand, or type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 w-full"
                        />
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Category Filter */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {uniqueCategories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="w-full sm:w-auto"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Active Filters Badges */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {searchTerm && (
                            <Badge variant="secondary" className="gap-1">
                                Search: {searchTerm}
                                <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => setSearchTerm('')}
                                />
                            </Badge>
                        )}
                        {selectedCategory !== 'all' && (
                            <Badge variant="secondary" className="gap-1">
                                Category: {selectedCategory}
                                <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => setSelectedCategory('all')}
                                />
                            </Badge>
                        )}
                        {selectedStatus !== 'all' && (
                            <Badge variant="secondary" className="gap-1">
                                Status: {selectedStatus === 'active' ? 'Active' : 'Inactive'}
                                <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={() => setSelectedStatus('all')}
                                />
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/50">
                        <TableHead className="w-[30px] min-w-[25px]">Item Details</TableHead>
                        <TableHead className="hidden md:table-cell w-10">Category</TableHead>
                        <TableHead className="hidden lg:table-cell w-8">Specs</TableHead>
                        <TableHead className="min-w-[45px] w-8">Price / Day</TableHead>
                        <TableHead className="min-w-[25px] w-6">Available</TableHead>
                        <TableHead className="hidden sm:table-cell w-6">Status</TableHead>
                        <TableHead className="text-right min-w-[25px] w-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="p-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {product.image ? (
                                            <Image 
                                                src={product.image} 
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            product.category?.name === 'Cameras' ? 
                                                <Camera className="h-4 w-4 text-slate-400" /> : 
                                                <Package className="h-4 w-4 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-slate-900 truncate max-w-[100px]">{product.name}</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[100px]">{product.brand}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell p-1">
                                <span className="text-sm font-medium text-slate-600">{product.category?.name || 'Uncategorized'}</span>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell p-1">
                                <span className="text-sm text-slate-500">{product.type || '--'}</span>
                            </TableCell>
                            <TableCell className="p-1">
                                <div className="space-y-1 min-w-[35px]">
                                    {product.discountPercentage && product.discountPercentage > 0 ? (
                                        <>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                                                    <span className="font-bold text-green-600 text-sm">₹{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                                                </div>
                                                <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 w-fit">
                                                    -{product.discountPercentage}%
                                                </span>
                                                {product.offerName && (
                                                    <div className="text-xs text-amber-600 font-medium truncate max-w-[35px]" title={product.offerName}>
                                                        {product.offerName}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="font-bold text-slate-900 text-sm">₹{product.price}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="p-1">
                                <div className="flex items-center justify-center">
                                    <Switch
                                        checked={product.isAvailable}
                                        onCheckedChange={() => handleToggleAvailability(product.id, !product.isAvailable)}
                                        className="data-[state=checked]:bg-green-500"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell p-1">
                                <Badge
                                    className={cn(
                                        "px-2 py-0.5 text-xs font-medium",
                                        product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    )}
                                >
                                    {product.isAvailable ? 'Active' : 'Inactive'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right p-1">
                                <div className="flex items-center justify-end gap-1">
                                    <Link href={`/admin/products/${product.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-amber-600">
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-slate-400 hover:text-red-600"
                                        onClick={() => handleDelete(product.id, product.name)}
                                        disabled={deletingId === product.id}
                                    >
                                        {deletingId === product.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredAndSortedProducts.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="h-32 text-center text-slate-400">
                                {products.length === 0 
                                    ? "No inventory items found. Add cameras or accessories above."
                                    : "No products match your filters. Try adjusting your search criteria."
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>

        {/* Custom Alert Dialog */}
        <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}


