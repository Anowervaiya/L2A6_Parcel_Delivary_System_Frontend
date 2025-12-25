"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { district: "Dhaka", delivered: 320, transit: 80, pending: 40 },
  { district: "Chittagong", delivered: 280, transit: 70, pending: 35 },
  { district: "Sylhet", delivered: 220, transit: 60, pending: 25 },
  { district: "Khulna", delivered: 190, transit: 50, pending: 20 },
  { district: "Rajshahi", delivered: 180, transit: 45, pending: 18 },
  { district: "Barisal", delivered: 160, transit: 40, pending: 15 },
  { district: "Rangpur", delivered: 140, transit: 35, pending: 12 },
  { district: "Mymensingh", delivered: 130, transit: 30, pending: 10 },
  { district: "Cox's Bazar", delivered: 110, transit: 25, pending: 8 },
  { district: "Comilla", delivered: 95, transit: 20, pending: 6 },
]

export function DistrictDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
