import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Image Skeleton */}
        <div className="space-y-6 lg:sticky lg:top-32">
          <Skeleton className="w-full aspect-square rounded-3xl" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>

        {/* Right: Content Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 gap-4">
               <Skeleton className="h-8 w-full" />
               <Skeleton className="h-8 w-full" />
               <Skeleton className="h-8 w-full" />
               <Skeleton className="h-8 w-full" />
            </div>
          </div>

          <div className="border rounded-3xl p-6 space-y-6">
             <div className="flex justify-between items-end">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-32" />
             </div>
             <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
