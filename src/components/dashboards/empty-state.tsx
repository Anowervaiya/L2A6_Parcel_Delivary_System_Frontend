"use client"

import type React from "react"

import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-12 flex flex-col items-center justify-center text-center min-h-96">
        <div className="mb-4 p-4 bg-muted rounded-full">
          {icon || <Package className="w-8 h-8 text-muted-foreground" />}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
      </CardContent>
    </Card>
  )
}
