'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { FeatureInput } from './feature-input'

interface Category {
    id: string
    name: string
}

interface ProductFormProps {
    initialData?: any
    categories: Category[]
    action: 'create' | 'update'
}

export function ProductForm({ initialData, categories, action }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price?.toString() || '',
        categoryId: initialData?.categoryId || '',
        image: initialData?.image || '',
        brand: initialData?.brand || '',
        type: initialData?.type || '',
        specs: initialData?.specs ? JSON.stringify(initialData.specs, null, 2) : '',
        features: Array.isArray(initialData?.features) ? initialData.features : (initialData?.features ? JSON.parse(initialData.features) : []),
        isAvailable: initialData?.isAvailable ?? true
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitch = (checked: boolean) => {
        setFormData(prev => ({ ...prev, isAvailable: checked }))
    }

    const handleSelect = (value: string) => {
        setFormData(prev => ({ ...prev, categoryId: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const url = action === 'create' ? '/api/admin/products' : `/api/admin/products/${initialData.id}`
        const method = action === 'create' ? 'POST' : 'PUT'

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                toast.success(`Product ${action === 'create' ? 'created' : 'updated'} successfully`)
                router.push('/admin/products')
                router.refresh()
            } else {
                const data = await res.json()
                toast.error(data.error || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Failed to submit form')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price per Day (₹)</Label>
                        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.categoryId} onValueChange={handleSelect} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type (e.g. Full Frame)</Label>
                        <Input id="type" name="type" value={formData.type} onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
                    {formData.image && (
                        <div className="mt-2 h-40 w-full rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                            <img src={formData.image} alt="Preview" className="h-full w-full object-contain" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="specs">Specs (JSON Format optional)</Label>
                    <Textarea id="specs" name="specs" value={formData.specs} onChange={handleChange} className="font-mono text-xs" rows={5} />
                </div>

                <div className="space-y-2">
                    <FeatureInput
                        features={formData.features}
                        onChange={(features) => setFormData(prev => ({ ...prev, features }))}
                        label="Features"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="isAvailable" checked={formData.isAvailable} onCheckedChange={handleSwitch} />
                    <Label htmlFor="isAvailable">Available for Rent</Label>
                </div>

            </div>

            <div className="flex gap-4">
                <Button onClick={() => router.back()} variant="outline" type="button">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-white">
                    {loading ? 'Saving...' : (action === 'create' ? 'Create Product' : 'Update Product')}
                </Button>
            </div>
        </form>
    )
}
