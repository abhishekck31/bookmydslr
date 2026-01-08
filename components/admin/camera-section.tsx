'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/hooks/use-toast"
import { Camera, Plus, Loader2 } from 'lucide-react'
import { FeatureInput } from './feature-input'

interface Category {
    id: string
    name: string
}

export function CameraSection({ categories, onUpdate }: { categories: Category[], onUpdate: () => void }) {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        type: '',
        price: '',
        basePrice: '',
        image: '',
        isAvailable: true,
        features: [] as string[],
        categoryId: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.categoryId) {
            toast({ title: "Please select a category", variant: "destructive" })
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                toast({ title: "Camera added successfully" })
                setFormData({ ...formData, name: '', brand: '', type: '', price: '', basePrice: '', image: '', isAvailable: true, features: [], categoryId: '' })
                onUpdate()
            } else {
                toast({ title: "Failed to add camera", variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error adding camera", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-amber-500" />
                    Camera Management
                </CardTitle>
                <CardDescription>Add new cameras to your inventory</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Camera Name</Label>
                            <Input placeholder="e.g. Sony A7IV" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Brand</Label>
                                <Input placeholder="Sony" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Model / Type</Label>
                                <Input placeholder="Full Frame" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price / Day (₹)</Label>
                                <Input type="number" placeholder="2000" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Base Price (₹)</Label>
                                <Input type="number" placeholder="1500" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select 
                                value={formData.categoryId} 
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Camera Image URL</Label>
                            <Input placeholder="https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                        </div>
                        {formData.image && (
                            <div className="h-32 w-full rounded-md border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center">
                                <img src={formData.image} alt="Preview" className="h-full object-contain" />
                            </div>
                        )}
                        <div className="flex items-center space-x-2 py-2">
                            <Switch checked={formData.isAvailable} onCheckedChange={checked => setFormData({ ...formData, isAvailable: checked })} />
                            <Label>Available for rent</Label>
                        </div>

                        <FeatureInput
                            features={formData.features}
                            onChange={(features) => setFormData({ ...formData, features })}
                            label="Camera Features"
                        />

                        <Button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4 mr-2" /> Add Camera</>}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
