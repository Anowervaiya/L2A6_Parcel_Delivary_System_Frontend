// Dashboard constants

export const DASHBOARD_ROUTES = {
  SENDER: "/dashboards/sender",
  RECEIVER: "/dashboards/receiver",
  ADMIN: "/dashboards/admin",
} as const

export const PARCEL_STATUS = {
  PENDING: "pending",
  IN_TRANSIT: "in-transit",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  OUT_FOR_DELIVERY: "out-for-delivery",
} as const

export const USER_ROLES = {
  SENDER: "sender",
  RECEIVER: "receiver",
  ADMIN: "admin",
} as const

export const ITEMS_PER_PAGE = {
  SMALL: 5,
  DEFAULT: 10,
  LARGE: 25,
} as const

export const STATUS_COLORS = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", dark: "dark:bg-yellow-900/30 dark:text-yellow-400" },
  "in-transit": { bg: "bg-blue-100", text: "text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400" },
  delivered: { bg: "bg-green-100", text: "text-green-700", dark: "dark:bg-green-900/30 dark:text-green-400" },
  cancelled: { bg: "bg-red-100", text: "text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" },
  "out-for-delivery": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dark: "dark:bg-orange-900/30 dark:text-orange-400",
  },
} as const
