"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPaginationItems } from "@/lib/dashboard-utils"

interface DashboardPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  totalItems?: number
}

export function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems,
}: DashboardPaginationProps) {
  const items = getPaginationItems(currentPage, totalPages)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 py-4 border-t">
      {totalItems && (
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-semibold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
          <span className="font-semibold">{totalItems}</span> items
        </p>
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {items.map((item, idx) =>
            item === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={item}
                variant={currentPage === item ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(item as number)}
                className="w-8 h-8 p-0"
              >
                {item}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
