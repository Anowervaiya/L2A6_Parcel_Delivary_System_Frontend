"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ExportDataProps {
  data: unknown[]
  filename?: string
  formats?: ("csv" | "json" | "pdf")[]
}

export function ExportData({ data, filename = "export", formats = ["csv", "json"] }: ExportDataProps) {
  const exportAsCSV = () => {
    if (Array.isArray(data) && data.length === 0) return

    const headers = Object.keys(data[0] as Record<string, unknown>)
    const csv = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => JSON.stringify((row as Record<string, unknown>)[header])).join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    a.click()
  }

  const exportAsJSON = () => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.json`
    a.click()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.includes("csv") && (
          <DropdownMenuItem onClick={exportAsCSV}>
            <span>Export as CSV</span>
          </DropdownMenuItem>
        )}
        {formats.includes("json") && (
          <DropdownMenuItem onClick={exportAsJSON}>
            <span>Export as JSON</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
