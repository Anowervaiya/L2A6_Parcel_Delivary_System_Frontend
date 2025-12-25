
import { Package, Inbox, Clock, CheckCircle } from "lucide-react"
import { OverviewCard } from "./overview-card"
import { DeliveryTrendChart } from "./charts/delivery-trend-chart"
import { LocationDistributionChart } from "./charts/location-distribution-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetReceiverDashboardStatsQuery, useGetReceiverParcelsQuery, type DeliveryTrendItem, type LocationDistributionItem } from "@/redux/features/dashboard/dashboard.api"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReceiverParcels from "@/pages/receiver/receiverParcels"
export default function ReceiverDashboard() {

  const {data} = useGetReceiverDashboardStatsQuery()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Receiver Dashboard</h1>
        <p className="text-muted-foreground">Track your incoming parcels and deliveries.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Incoming Parcels"
          value={data?.data?.incomingParcels as number}
          icon={<Inbox className="w-6 h-6" />}
          badge={{ label: "New", color: "blue" }}
        />
        <OverviewCard
          title="Delivered This Month"
          value={data?.data?.deliveredThisMonth as number}
          icon={<CheckCircle className="w-6 h-6" />}
          trend={{ value: 15, isPositive: true }}
        />
        <OverviewCard
          title="Pending Confirmation"
          value={data?.data?.pendingConfirmation as number}
          icon={<Clock className="w-6 h-6" />}
          badge={{ label: "Action", color: "orange" }}
        />
        <OverviewCard title="Total Received"
          value={data?.data?.totalReceived as number}
          icon={<Package className="w-6 h-6" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deliveries Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryTrendChart data={data?.data?.deliveryTrend as DeliveryTrendItem[]}/>
          </CardContent>
        </Card>

        <Card >
          <CardHeader>
            <CardTitle className="text-lg">Delivery Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationDistributionChart data={data?.data?.locationDistribution as LocationDistributionItem[]} />
          </CardContent>
        </Card>
      </div>

      {/* Incoming Parcels Table */}
     
   {/* Received Parcels Section */}
    <ReceiverParcels/>
    
    </div>
  )
}
