
import { useGetAdminRevenueGrowthQuery } from "@/redux/features/dashboard/dashboard.api"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



export function RevenueGrowthChart() {
  const {data} = useGetAdminRevenueGrowthQuery()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data?.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          name="Actual Revenue"
        />
        <Area
          type="monotone"
          dataKey="projection"
          stroke="var(--chart-2)"
          strokeWidth={2}
          strokeDasharray="5 5"
          fill="none"
          name="Projected Revenue"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
