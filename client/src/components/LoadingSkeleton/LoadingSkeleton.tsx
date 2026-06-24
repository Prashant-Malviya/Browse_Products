import { cn } from '@/utils'

function Shimmer({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-ink-100 dark:bg-ink-800', className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
      <div className="flex items-center justify-between">
        <Shimmer className="h-5 w-20 rounded-full" />
        <Shimmer className="h-4 w-12" />
      </div>
      <Shimmer className="mt-4 h-5 w-3/4" />
      <Shimmer className="mt-2 h-4 w-1/2" />
      <div className="mt-5 flex items-center justify-between">
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-4 w-20" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
      <Shimmer className="h-3 w-16" />
      <Shimmer className="mt-3 h-8 w-24" />
      <Shimmer className="mt-2 h-3 w-32" />
    </div>
  )
}
