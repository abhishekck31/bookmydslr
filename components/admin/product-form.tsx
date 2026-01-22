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
    initialData?: any
    onSuccess?: () => void
    action?: 'create' | 'update'
}

export function ProductForm({ categories, initialData, onSuccess, action = 'create' }: ProductFormProps) {
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [nextAction, setNextAction] = useState<'save' | 'save_and_new'>('save')

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

    // Initialize form data
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
        features: parseFeatures(initialData?.features),
        discountPercentage: initialData?.discountPercentage?.toString() || '',
        offerName: initialData?.offerName || ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                categoryId: initialData.categoryId || '',
                brand: initialData.brand || '',
                type: initialData.type || '',
                price: initialData.price?.toString() || '',
                basePrice: initialData.basePrice?.toString() || '',
                description: initialData.description || '',
                image: initialData.image || '',
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
                features: parseFeatures(initialData.features),
                discountPercentage: initialData.discountPercentage?.toString() || '',
                offerName: initialData.offerName || ''
            })
        }
    }, [initialData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.categoryId) {
            toast({ title: "Category is required", variant: "destructive" })
            return
        }

        setLoading(true)
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
                discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : 0,
                offerName: formData.offerName || null,
                features: formData.features
            }

            let url = '/api/admin/products'
            let method = 'POST'

            if (action === 'update' && initialData?.id) {
                url = `/api/admin/products/${initialData.id}`
                method = 'PUT'
            }

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast({ title: action === 'update' ? "Product updated successfully 🚀" : "Product added successfully! 🚀" })

                if (action === 'create' && nextAction === 'save_and_new') {
                    // Reset form
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
                        features: [],
                        discountPercentage: '',
                        offerName: ''
                    })
                    // Ensure we are at top
                    window.scrollTo(0, 0)
                } else {
                    if (onSuccess) {
                        onSuccess()
                    } else {
                        router.push('/admin/products')
                        router.refresh()
                    }
                }
            } else {
                const data = await res.json()
                toast({ title: data.error || "Failed to save product", variant: "destructive" })
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    {/* Discount Section */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-amber-600" />
                            <h3 className="text-lg font-semibold text-amber-900">Discount & Offers</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Discount Percentage (%)</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={formData.discountPercentage}
                                    onChange={e => setFormData({ ...formData, discountPercentage: e.target.value })}
                                />
                                <p className="text-xs text-amber-600">Enter discount percentage (0-100)</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Offer Name <span className="text-gray-400 font-normal">(Optional)</span></Label>
                                <Input
                                    placeholder="e.g. Summer Sale, Weekend Special"
                                    value={formData.offerName}
                                    onChange={e => setFormData({ ...formData, offerName: e.target.value })}
                                />
                                <p className="text-xs text-amber-600">Custom offer name for display</p>
                            </div>
                        </div>

                        {/* Price Calculation Preview */}
                        {(formData.discountPercentage && parseFloat(formData.discountPercentage) > 0) && (
                            <div className="bg-white rounded-lg p-4 border border-amber-100">
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Original Price:</span>
                                        <span className="font-medium">₹{formData.price || '0'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Discount ({formData.discountPercentage}%):</span>
                                        <span className="font-medium text-red-600">-₹{((parseFloat(formData.price) || 0) * (parseFloat(formData.discountPercentage) || 0) / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-amber-100">
                                        <span className="font-semibold text-amber-900">Final Price:</span>
                                        <span className="font-bold text-lg text-green-600">₹{((parseFloat(formData.price) || 0) * (1 - (parseFloat(formData.discountPercentage) || 0) / 100)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
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

                {/* Right Column */}
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
                        </div>
                    </div>

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

            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                    type="submit"
                    disabled={loading}
                    onClick={() => setNextAction('save')}
                    className="flex-1 h-12 text-base bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
                >
                    {loading && nextAction === 'save' ? <Loader2 className="h-5 w-5 animate-spin" /> :
                        action === 'update' ? <><Save className="h-5 w-5 mr-2" /> Update Product</> :
                            <><Plus className="h-5 w-5 mr-2" /> Add to Inventory</>
                    }
                </Button>

                {action === 'create' && (
                    <Button
                        type="submit"
                        disabled={loading}
                        variant="outline"
                        onClick={() => setNextAction('save_and_new')}
                        className="flex-1 h-12 text-base border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
                    >
                        {loading && nextAction === 'save_and_new' ? <Loader2 className="h-5 w-5 animate-spin" /> :
                            <><Sparkles className="h-5 w-5 mr-2" /> Save & Add Another</>
                        }
                    </Button>
                )}
            </div>
        </form>
    )
}
