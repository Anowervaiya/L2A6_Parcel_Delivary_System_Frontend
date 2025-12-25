

import { useGetAdminParcelTrendsQuery } from "@/redux/features/dashboard/dashboard.api"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { day: "Day 1", delivered: 45, transit: 32, pending: 12 },
  { day: "Day 2", delivered: 52, transit: 38, pending: 10 },
  { day: "Day 3", delivered: 48, transit: 45, pending: 14 },
  { day: "Day 4", delivered: 61, transit: 42, pending: 8 },
  { day: "Day 5", delivered: 55, transit: 50, pending: 11 },
  { day: "Day 6", delivered: 67, transit: 48, pending: 9 },
  { day: "Day 7", delivered: 72, transit: 52, pending: 6 },
  { day: "Day 8", delivered: 78, transit: 58, pending: 7 },
  { day: "Day 9", delivered: 85, transit: 62, pending: 5 },
  { day: "Day 10", delivered: 92, transit: 68, pending: 4 },
]

export function ParcelTrendsChart() {
  const {data} = useGetAdminParcelTrendsQuery();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data?.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="day" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="delivered" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="transit" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="pending" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
