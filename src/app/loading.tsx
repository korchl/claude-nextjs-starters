import { Skeleton } from "@/components/ui/skeleton"

// 글로벌 로딩 상태
export default function Loading() {
  return (
    <div className="space-y-4 px-4 py-8">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-3/4" />
    </div>
  )
}
