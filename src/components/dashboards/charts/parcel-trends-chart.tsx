

import { useGetAdminParcelTrendsQuery } from "@/redux/features/dashboard/dashboard.api"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



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
