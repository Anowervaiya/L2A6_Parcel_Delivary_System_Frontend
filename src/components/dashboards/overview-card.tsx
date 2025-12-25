"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  title: string
  value:  number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  badge?: {
    label: string
    color: "default" | "orange" | "blue" | "green"
  }
  className?: string
}

const badgeColors = {
  default: "bg-muted text-muted-foreground",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
}

export function OverviewCard({ title, value, icon, trend, badge, className }: OverviewCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">{icon}</div>
          {badge && (
            <span className={cn("text-xs font-semibold px-2 py-1 rounded", badgeColors[badge.color])}>
              {badge.label}
            </span>
          )}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>

        {trend && (
          <div className="flex items-center gap-1 mt-3">
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={cn("text-xs font-semibold", trend.isPositive ? "text-green-500" : "text-red-500")}>
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
