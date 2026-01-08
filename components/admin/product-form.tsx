'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/hooks/use-toast"
import { Plus, Loader2, Image as ImageIcon, Sparkles, Save } from 'lucide-react'
import { FeatureInput } from './feature-input'

interface Category {
    id: string
    name: string
}

interface ProductFormProps {
    categories: Category[]
    onSuccess?: () => void
    initialData?: any
    action?: 'create' | 'update'
}

export function ProductForm({ categories, onSuccess, initialData, action = 'create' }: ProductFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    
    // Parse features from initialData if it's a JSON string or array
    const parseFeatures = (features: any): string[] => {
        if (!features) return []
        if (Array.isArray(features)) return features
        if (typeof features === 'string') {
            try {
                const parsed = JSON.parse(features)
                return Array.isArray(parsed) ? parsed : []
            } catch {
                return []
            }
        }
        return []
    }

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        categoryId: initialData?.categoryId || '',
        brand: initialData?.brand || '',
        type: initialData?.type || '',
        price: initialData?.price?.toString() || '',
        basePrice: '',
        description: initialData?.description || '',
        image: initialData?.image || '',
        isAvailable: initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
        features: parseFeatures(initialData?.features)
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                categoryId: initialData.categoryId || '',
                brand: initialData.brand || '',
                type: initialData.type || '',
                price: initialData.price?.toString() || '',
                basePrice: '',
                description: initialData.description || '',
                image: initialData.image || '',
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
                features: parseFeatures(initialData.features)
            })
        }
    }, [initialData])

    // Auto-fill brand/type logic can be added here if needed, but keeping it explicit is better for Admin CRUD.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.categoryId) {
            toast({ title: "Category is required", variant: "destructive" })
            return
        }

        setLoading(true)
        try {
            // Prepare payload
            const payload = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
                // Ensure features is an array
                features: formData.features
            }

            const url = action === 'update' && initialData?.id 
                ? `/api/admin/products/${initialData.id}`
                : '/api/admin/products'
            const method = action === 'update' ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast({ 
                    title: action === 'update' ? "Product updated successfully! ✅" : "Product added successfully! 🚀" 
                })
                
                if (action === 'update') {
                    // Navigate back or refresh
                    if (onSuccess) {
                        onSuccess()
                    } else {
                        router.push('/admin/dashboard')
                    }
                } else {
                    // Reset form for create
                    setFormData({
                        name: '',
                        categoryId: '',
                        brand: '',
                        type: '',
                        price: '',
                        basePrice: '',
                        description: '',
                        image: '',
                        isAvailable: true,
                        features: []
                    })
                    if (onSuccess) onSuccess()
                }
            } else {
                const errorData = await res.json().catch(() => ({}))
                toast({ 
                    title: action === 'update' ? "Failed to update product" : "Failed to add product", 
                    description: errorData.error || 'Please try again',
                    variant: "destructive" 
                })
            }
        } catch (error) {
            console.error(error)
            toast({ title: "Error submitting form", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Core Details */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input 
                            placeholder="e.g. Canon EOS R5 / DJI Ronin" 
                            value={formData.name} 
                            onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select 
                                value={formData.categoryId} 
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.isArray(categories) && categories.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Brand</Label>
                            <Input 
                                placeholder="e.g. Canon, Sony" 
                                value={formData.brand} 
                                onChange={e => setFormData({ ...formData, brand: e.target.value })} 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Daily Price (₹)</Label>
                            <Input 
                                type="number" 
                                placeholder="0" 
                                value={formData.price} 
                                onChange={e => setFormData({ ...formData, price: e.target.value })} 
                                required 
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>Model / Type</Label>
                            <Input 
                                placeholder="e.g. Mirrorless, Gimbal" 
                                value={formData.type} 
                                onChange={e => setFormData({ ...formData, type: e.target.value })} 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                         <Label>Description <span className="text-gray-400 font-normal">(Optional)</span></Label>
                         <Textarea 
                            placeholder="Brief details about the product..." 
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="h-24 resize-none"
                         />
                    </div>
                </div>

                {/* Right Column: Media & Features */}
                <div className="space-y-6">
                     <div className="space-y-2">
                        <Label>Image URL</Label>
                        <div className="flex gap-2">
                            <Input 
                                placeholder="https://..." 
                                value={formData.image} 
                                onChange={e => setFormData({ ...formData, image: e.target.value })} 
                                required 
                            />
                            {/* Future: Add Upload Button here */}
                        </div>
                    </div>
                    
                    {/* Image Preview */}
                    <div className="h-48 w-full rounded-xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative">
                        {formData.image ? (
                            <img src={formData.image} alt="Preview" className="h-full w-full object-contain p-2" />
                        ) : (
                            <>
                                <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                                <span className="text-xs">Image preview will appear here</span>
                            </>
                        )}
                    </div>

                    <FeatureInput
                        features={formData.features}
                        onChange={(features) => setFormData({ ...formData, features })}
                        label="Product Features / Specs"
                    />

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="space-y-0.5">
                            <Label className="text-base">Available for Rent</Label>
                            <p className="text-xs text-slate-500">Toggle this to hide product from customers</p>
                        </div>
                        <Switch 
                            checked={formData.isAvailable} 
                            onCheckedChange={checked => setFormData({ ...formData, isAvailable: checked })} 
                        />
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-base bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md hover:shadow-lg transition-all">
                {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : action === 'update' ? (
                    <>
                        <Save className="h-5 w-5 mr-2" /> Update Product
                    </>
                ) : (
                    <>
                        <Plus className="h-5 w-5 mr-2" /> Add to Inventory
                    </>
                )}
            </Button>
        </form>
    )
}
