

import { Package, Users, Clock, DollarSign } from "lucide-react"
import { OverviewCard } from "./overview-card"
import { ParcelTrendsChart } from "./charts/parcel-trends-chart"
import { DistrictDistributionChart } from "./charts/district-distribution-chart"
import { RevenueGrowthChart } from "./charts/revenue-growth-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAdminOverviewQuery, useGetAdminSystemMetricsQuery } from "@/redux/features/dashboard/dashboard.api"

export default function AdminDashboard() {


const {data:overviewData} = useGetAdminOverviewQuery();
const {data: systemMetrics} = useGetAdminSystemMetricsQuery()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and comprehensive management.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total System Parcels"
          value={overviewData?.data?.totalParcels as number}
          icon={<Package className="w-6 h-6" />}
        />
        <OverviewCard
          title="Total Users"
          value={overviewData?.data?.totalUsers as number}
          icon={<Users className="w-6 h-6" />}
        />
        <OverviewCard
          title="Pending Deliveries"
          value={overviewData?.data?.pendingDeliveries as number}

          icon={<Clock className="w-6 h-6" />}
          badge={{ label: "Monitor", color: "orange" }}
        />
        <OverviewCard
          title="Revenue This Month"
          value={overviewData?.data?.revenueThisMonth as number}
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>

      {/* Charts Section - Multi-line Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Parcel Trends (last 3 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ParcelTrendsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 ">
            <div className="bg-yellow-400 p-2 rounded-md ">
              <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
              <p className="text-2xl font-bold">{systemMetrics?.data?.avgDeliveryTime}</p>
            </div>
            <div className="bg-green-400 p-2 rounded-md ">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{systemMetrics?.data?.successRate}</p>
            </div>
            <div className="bg-blue-400 p-2 rounded-md ">
              <p className="text-sm text-muted-foreground">Peak Hours</p>
              <p className="text-2xl font-bold">{systemMetrics?.data?.peakHours}</p>
            </div>
           
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - District and Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parcels by Top 10 Districts</CardTitle>
          </CardHeader>
          <CardContent>
            <DistrictDistributionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Growth & Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueGrowthChart />
          </CardContent>
        </Card>
      </div>

    
    </div>
  )
}
