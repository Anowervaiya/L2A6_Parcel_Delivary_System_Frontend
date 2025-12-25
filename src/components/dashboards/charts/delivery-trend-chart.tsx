

import type { DeliveryTrendItem } from "@/redux/features/dashboard/dashboard.api"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// const data = [
//   { month: "Jan", deliveries: 120 },
//   { month: "Feb", deliveries: 150 },
//   { month: "Mar", deliveries: 180 },
//   { month: "Apr", deliveries: 220 },
//   { month: "May", deliveries: 280 },
//   { month: "Jun", deliveries: 340 },
//   { month: "Jul", deliveries: 380 },
//   { month: "Aug", deliveries: 420 },
//   { month: "Sep", deliveries: 450 },
//   { month: "Oct", deliveries: 480 },
//   { month: "Nov", deliveries: 520 },
//   { month: "Dec", deliveries: 580 },
// ]

export function DeliveryTrendChart({data} : {data: DeliveryTrendItem[]}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
        <Line
          type="monotone"
          dataKey="deliveries"
          stroke="var(--chart-1)"
          dot={false}
          strokeWidth={2}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
