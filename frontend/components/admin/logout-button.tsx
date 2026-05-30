'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
    const router = useRouter()
    return (
        <button
            onClick={() => router.push('/admin/login')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
        >
            <LogOut className="h-5 w-5" />
            Logout
        </button>
    )
}
