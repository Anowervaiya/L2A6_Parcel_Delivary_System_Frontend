

import { Package, Clock, Truck, CheckCircle } from "lucide-react"
import { OverviewCard } from "./overview-card"
import { MonthlyVolumeChart } from "./charts/monthly-volume-chart"
import { StatusDistributionChart } from "./charts/status-distribution-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetDashboardStatsQuery, type MonthlyDataItem, type StatusDistributionItem } from "@/redux/features/parcel/parcel.api"
import SenderParcelTable from "@/pages/sender/SenderParcelTable"

export default function SenderDashboard() {

  const {data : dashboardData} = useGetDashboardStatsQuery()


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sender Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your shipment overview.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Parcels Sent"
          value={dashboardData?.data?.totalParcels as number}
          icon={<Package className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <OverviewCard
          title="Requested Pickups"
          value={dashboardData?.data?.requested as number}
          icon={<Clock className="w-6 h-6" />}
          badge={{ label: "Action Required", color: "orange" }}
        />
        <OverviewCard
          title="In Transit"
          value={dashboardData?.data?.inTransit as number}
          icon={<Truck className="w-6 h-6" />}
          badge={{ label: "In Progress", color: "blue" }}
        />
        <OverviewCard
          title="Delivered"
          value={dashboardData?.data?.delivered as number}
          icon={<CheckCircle className="w-6 h-6" />}
          badge={{ label: "Completed", color: "green" }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Parcel Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyVolumeChart monthlyData={dashboardData?.data?.monthlyData as MonthlyDataItem[]}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parcel Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusDistributionChart data={dashboardData?.data?.statusDistribution as StatusDistributionItem[]}/>
          </CardContent>
        </Card>
      </div>

      {/* Parcels Table */}
      {/* <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Recent Shipments</CardTitle>
          <Button>Create New Parcel</Button>
        </CardHeader> */}
        {/* <CardContent className="space-y-4"> */}
          {/* Search and Filters */}
          {/* <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Search by tracking ID or receiver..." className="flex-1" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Table */}
          {/* <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Receiver Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParcels.map((parcel) => (
                  <TableRow key={parcel.id}>
                    <TableCell className="font-medium">{parcel.id}</TableCell>
                    <TableCell>{parcel.receiver}</TableCell>
                    <TableCell>{parcel.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          parcel.status === "delivered"
                            ? "default"
                            : parcel.status === "in-transit"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {parcel.status.charAt(0).toUpperCase() + parcel.status.slice(1).replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{parcel.date}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div> */}
        {/* </CardContent> */}
      {/* </Card> */}

      <SenderParcelTable/>

  
    </div>
  )
}
