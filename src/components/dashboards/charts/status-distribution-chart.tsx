"use client"

import { ParcelStatus } from "@/constants/parcelType"
import type { StatusDistributionItem } from "@/redux/features/parcel/parcel.api"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// const data = [
//   { name: "Pending", value: 25, color: "var(--chart-2)" },
//   { name: "In Transit", value: 45, color: "var(--chart-1)" },
//   { name: "Delivered", value: 25, color: "var(--chart-3)" },
//   { name: "Cancelled", value: 5, color: "var(--destructive)" },
// ]

const getColor=(status: string)=>{
  if(status===ParcelStatus.REQUESTED.toLowerCase()) return "var(--chart-2)"
   if(status===ParcelStatus.IN_TRANSIT.toLowerCase()) return "var(--chart-1)"
  if(status===ParcelStatus.DELIVERED.toLowerCase()) return "var(--chart-3)"
  if(status===ParcelStatus.CANCELLED.toLowerCase()) return "var(--destructive)"
  if(status===ParcelStatus.APPROVED.toLowerCase()) return "var(--chart-4)"
  if(status===ParcelStatus.DISPATCHED.toLowerCase()) return "var(--chart-7)"
}
export function StatusDistributionChart({data} : {data: StatusDistributionItem[]}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data as any}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => `${entry.name}: ${entry.value}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
