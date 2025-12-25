

import type { MonthlyDataItem } from "@/redux/features/parcel/parcel.api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



export function MonthlyVolumeChart({monthlyData} : {monthlyData: MonthlyDataItem[]} ) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData as any} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Bar dataKey="parcels" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
