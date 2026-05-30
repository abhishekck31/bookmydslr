import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-10 w-48 mb-2" />
      <Skeleton className="h-4 w-96 mb-8" />

      <div className="space-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
            <Skeleton className="h-8 w-48 mb-4" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center p-2">
                    <Skeleton className="h-12 w-12 rounded-md mr-3" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
