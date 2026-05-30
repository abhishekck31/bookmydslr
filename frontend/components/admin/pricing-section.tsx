'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Percent, Save, Loader2 } from 'lucide-react'

export function PricingSection() {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [settings, setSettings] = useState({
        discountPercent: 0,
        isDiscountActive: false
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings')
            if (res.ok) {
                const data = await res.json()
                setSettings({
                    discountPercent: data.discountPercent,
                    isDiscountActive: data.isDiscountActive
                })
            }
        } catch (error) {
            console.error("Error fetching settings:", error)
        } finally {
            setFetching(false)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            })
            if (res.ok) {
                toast.success('Settings updated successfully')
            } else {
                toast.error('Failed to update settings')
            }
        } catch (error) {
            toast.error('Error saving settings')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) return <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-amber-500" />
                    Pricing & Discounts
                </CardTitle>
                <CardDescription>Manage global pricing logic and percentage discounts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="flex-1 space-y-2 w-full">
                        <Label>Global Discount Percentage (%)</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="10"
                                value={settings.discountPercent}
                                onChange={e => setSettings({ ...settings, discountPercent: parseFloat(e.target.value) || 0 })}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pb-2 h-10">
                        <Switch
                            id="discount-toggle"
                            checked={settings.isDiscountActive}
                            onCheckedChange={checked => setSettings({ ...settings, isDiscountActive: checked })}
                        />
                        <Label htmlFor="discount-toggle">Enable Discount Globally</Label>
                    </div>
                    <Button onClick={handleSave} disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white px-8">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Settings</>}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
