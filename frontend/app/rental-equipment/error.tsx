'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                We couldn&apos;t load the rental equipment. This might be a temporary connection issue.
            </p>
            <Button onClick={() => reset()} variant="outline">
                Try again
            </Button>
        </div>
    )
}
