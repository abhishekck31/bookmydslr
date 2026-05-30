import Link from 'next/link'
import { LogoutButton } from '@/components/admin/logout-button'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-slate-100 py-4 px-8 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <span className="font-bold text-xl text-slate-900">Admin<span className="text-amber-500">Panel</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 font-medium">BookMyDSLR Official</span>
                        <div className="h-4 w-[1px] bg-slate-200" />
                        <LogoutButton />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                {children}
            </main>
        </div>
    )
}
