// Utility functions for dashboard operations

export type ParcelStatus = "pending" | "in-transit" | "delivered" | "cancelled" | "out-for-delivery"
export type UserRole = "sender" | "receiver" | "admin"
export type UserStatus = "active" | "blocked" | "suspended"

export const getStatusColor = (status: ParcelStatus): string => {
  const colors: Record<ParcelStatus, string> = {
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    "in-transit": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    delivered: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    "out-for-delivery": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  }
  return colors[status] || "bg-gray-100 dark:bg-gray-900/30"
}

export const getStatusLabel = (status: ParcelStatus): string => {
  const labels: Record<ParcelStatus, string> = {
    pending: "Pending",
    "in-transit": "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
    "out-for-delivery": "Out for Delivery",
  }
  return labels[status] || status
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text
}

export const calculateTrend = (current: number, previous: number): { value: number; isPositive: boolean } => {
  const diff = current - previous
  const percentage = Math.abs((diff / previous) * 100)
  return {
    value: Math.round(percentage),
    isPositive: diff >= 0,
  }
}

// Pagination utilities
export const getPaginationItems = (currentPage: number, totalPages: number, maxVisible = 5) => {
  const items: (number | string)[] = []

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
  } else {
    items.push(1)

    let startPage = Math.max(2, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2))

    if (endPage - startPage < maxVisible - 2) {
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, startPage + maxVisible - 3)
      } else {
        startPage = Math.max(2, endPage - maxVisible + 3)
      }
    }

    if (startPage > 2) items.push("...")
    for (let i = startPage; i <= endPage; i++) {
      items.push(i)
    }
    if (endPage < totalPages - 1) items.push("...")
    items.push(totalPages)
  }

  return items
}
