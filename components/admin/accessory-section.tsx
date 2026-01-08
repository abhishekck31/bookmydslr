'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/hooks/use-toast"
import { Package, Plus, Loader2 } from 'lucide-react'
import { FeatureInput } from './feature-input'

interface Category {
    id: string
    name: string
}

export function AccessorySection({ categories, onUpdate }: { categories: Category[], onUpdate: () => void }) {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
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
                body: JSON.stringify({
                    ...formData,
                    brand: 'Accessory', // Default brand for accessories
                    description: `Type: ${formData.type}`
                })
            })
            if (res.ok) {
                toast({ title: "Accessory added successfully" })
                setFormData({ ...formData, name: '', type: '', price: '', image: '', isAvailable: true, features: [], categoryId: '' })
                onUpdate()
            } else {
                toast({ title: "Failed to add accessory", variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error adding accessory", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-amber-500" />
                    Accessory Management
                </CardTitle>
                <CardDescription>Add new accessories like tripods, mics, lenses</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Accessory Name</Label>
                            <Input placeholder="e.g. DJI Ronin SC" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Input placeholder="e.g. Gimbal / Tripod" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Price / Day (₹)</Label>
                            <Input type="number" placeholder="500" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
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
                            <Label>Image URL</Label>
                            <Input placeholder="https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                            <Switch checked={formData.isAvailable} onCheckedChange={checked => setFormData({ ...formData, isAvailable: checked })} />
                            <Label>Available in stock</Label>
                        </div>

                        <FeatureInput
                            features={formData.features}
                            onChange={(features) => setFormData({ ...formData, features })}
                            label="Accessory Features"
                        />

                        <Button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4 mr-2" /> Add Accessory</>}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
