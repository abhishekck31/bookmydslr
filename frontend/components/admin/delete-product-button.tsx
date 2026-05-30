'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteProductButtonProps {
    id: string
    name: string
}

export function DeleteProductButton({ id, name }: DeleteProductButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return
        }

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                toast.success('Product deleted successfully')
                router.refresh()
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to delete product')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 dark:hover:text-red-400"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </Button>
    )
}
