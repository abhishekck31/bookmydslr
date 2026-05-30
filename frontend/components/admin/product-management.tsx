'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PackageSearch } from 'lucide-react'
import { ProductForm } from './product-form'

interface Category {
    id: string
    name: string
}

interface ProductManagementProps {
    categories: Category[]
    onUpdate: () => void
}

export function ProductManagement({ categories, onUpdate }: ProductManagementProps) {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <PackageSearch className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Inventory Management</CardTitle>
                        <CardDescription>Add new cameras, lenses, or accessories to your unified catalog.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-8">
                <ProductForm categories={categories} onSuccess={onUpdate} />
            </CardContent>
        </Card>
    )
}
