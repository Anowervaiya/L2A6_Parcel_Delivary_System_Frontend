

import type { LocationDistributionItem } from "@/redux/features/dashboard/dashboard.api"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Dhaka", value: 35 },
  { name: "Chittagong", value: 20 },
  { name: "Sylhet", value: 15 },
  { name: "Khulna", value: 12 },
  { name: "Others", value: 18 },
]

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function LocationDistributionChart({data}: {data:LocationDistributionItem[]}) {
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
