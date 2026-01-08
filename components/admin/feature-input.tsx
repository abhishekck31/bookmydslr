'use client'

import { useState, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

interface FeatureInputProps {
    features: string[]
    onChange: (features: string[]) => void
    label?: string
    placeholder?: string
}

export function FeatureInput({ features, onChange, label = "Features", placeholder = "Press Enter to add feature..." }: FeatureInputProps) {
    const [inputValue, setInputValue] = useState('')

    const addFeature = () => {
        const trimmed = inputValue.trim()
        if (trimmed && !features.includes(trimmed)) {
            onChange([...features, trimmed])
            setInputValue('')
        }
    }

    const removeFeature = (index: number) => {
        onChange(features.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addFeature()
        }
    }

    return (
        <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">{label}</Label>

            <div className="relative">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="pr-10 border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-lg"
                />
                <button
                    type="button"
                    onClick={addFeature}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-amber-500 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                    <Badge
                        key={`${feature}-${index}`}
                        variant="secondary"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 gap-2 rounded-full border-none group transition-all"
                    >
                        <span className="text-sm font-medium">{feature}</span>
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="hover:text-red-500 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                {features.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No features added yet.</p>
                )}
            </div>
        </div>
    )
}
