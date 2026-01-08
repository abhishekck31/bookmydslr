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

interface Product {
    id: string
    name: string
    brand: string | null
    type: string | null
    price: number
    image: string | null
    isAvailable: boolean
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
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('newest')

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
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name, brand, or type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-[180px]">
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
                        <SelectTrigger className="w-full md:w-[150px]">
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
                        <SelectTrigger className="w-full md:w-[180px]">
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
                            className="w-full md:w-auto"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Clear
                        </Button>
                    )}
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
                        <TableHead className="w-[300px]">Item Details</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Specs</TableHead>
                        <TableHead>Price / Day</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {product.image ? (
                                            <Image 
                                                src={product.image} 
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            product.category?.name === 'Cameras' ? 
                                                <Camera className="h-5 w-5 text-slate-400" /> : 
                                                <Package className="h-5 w-5 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900">{product.name}</span>
                                        <span className="text-xs text-slate-500">{product.brand || 'No Brand'}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm font-medium text-slate-600">{product.category?.name || 'Uncategorized'}</span>
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
                                    <Link href={`/admin/products/${product.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
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
                    {filteredAndSortedProducts.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-slate-400">
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
    )
}


