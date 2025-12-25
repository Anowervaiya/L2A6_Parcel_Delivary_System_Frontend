

import { useGetAdminDistrictDistributionQuery } from "@/redux/features/dashboard/dashboard.api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"



export function DistrictDistributionChart() {

  const {data} = useGetAdminDistrictDistributionQuery()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data?.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="district" stroke="var(--muted-foreground)" angle={-45} textAnchor="end" height={80} />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Bar dataKey="delivered" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="transit" stackId="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pending" stackId="a" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
