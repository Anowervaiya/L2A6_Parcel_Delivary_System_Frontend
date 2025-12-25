"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function OverviewCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <Skeleton className="w-16 h-6" />
        </div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-32 mb-3" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  )
}

export function ChartCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex gap-4 py-4">
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  )
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <OverviewCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <ChartCardSkeleton key={i} />
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-6" />
          <TableSkeleton rows={5} />
        </CardContent>
      </Card>
    </div>
  )
}
