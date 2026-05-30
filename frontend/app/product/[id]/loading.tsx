import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="border-b border-gray-100 bg-gray-50/30 sticky top-16 z-20 backdrop-blur-sm">
        <div className="container py-4">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      <div className="container py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6 lg:sticky lg:top-32">
            <Skeleton className="aspect-square rounded-3xl w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-20 rounded-2xl" />
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-24 w-full mb-8" />

            <div className="bg-white border rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-end border-b pb-6">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
