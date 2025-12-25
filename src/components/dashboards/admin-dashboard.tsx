"use client"

import { Package, Users, Clock, DollarSign } from "lucide-react"
import { OverviewCard } from "./overview-card"
import { ParcelTrendsChart } from "./charts/parcel-trends-chart"
import { DistrictDistributionChart } from "./charts/district-distribution-chart"
import { RevenueGrowthChart } from "./charts/revenue-growth-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const mockUsers = [
    {
      id: 1,
      name: "Karim Ahmed",
      email: "karim@example.com",
      role: "Sender",
      status: "active",
      parcels: 45,
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Fatima Begum",
      email: "fatima@example.com",
      role: "Receiver",
      status: "active",
      parcels: 28,
      joined: "2024-02-20",
    },
    {
      id: 3,
      name: "Abdul Hossain",
      email: "abdul@example.com",
      role: "Sender",
      status: "blocked",
      parcels: 12,
      joined: "2024-03-10",
    },
    {
      id: 4,
      name: "Naz Erin Khan",
      email: "naz@example.com",
      role: "Receiver",
      status: "active",
      parcels: 56,
      joined: "2024-04-05",
    },
  ]

  const mockParcels = [
    { id: "PKL-001", sender: "Karim Ahmed", status: "delivered", district: "Dhaka", date: "2024-12-20" },
    { id: "PKL-002", sender: "Fatima Begum", status: "in-transit", district: "Chittagong", date: "2024-12-21" },
    { id: "PKL-003", sender: "Store XYZ", status: "pending", district: "Sylhet", date: "2024-12-21" },
    { id: "PKL-004", sender: "Ahmed Store", status: "delivered", district: "Khulna", date: "2024-12-19" },
    { id: "PKL-005", sender: "Fashion Hub", status: "in-transit", district: "Rajshahi", date: "2024-12-20" },
  ]

  const topSenders = [
    { name: "Ahmed Store", parcels: 248, revenue: "$12,400" },
    { name: "Fashion Hub", parcels: 195, revenue: "$9,750" },
    { name: "Electronics Plus", parcels: 178, revenue: "$8,900" },
  ]

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
          value="2,840"
          icon={<Package className="w-6 h-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <OverviewCard
          title="Active Users"
          value="512"
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <OverviewCard
          title="Pending Deliveries"
          value="156"
          icon={<Clock className="w-6 h-6" />}
          badge={{ label: "Monitor", color: "orange" }}
        />
        <OverviewCard
          title="Revenue This Month"
          value="$48,520"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Charts Section - Multi-line Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Parcel Trends by Status (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ParcelTrendsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
              <p className="text-2xl font-bold">2.4 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">98.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak Hours</p>
              <p className="text-2xl font-bold">2-4 PM</p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">Active Now</p>
              <p className="text-2xl font-bold">142</p>
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

      {/* User Management Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>User Management</CardTitle>
          <Button>Add User</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Search users by name or email..." className="flex-1" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="sender">Senders</SelectItem>
                <SelectItem value="receiver">Receivers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Parcels</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.parcels}</TableCell>
                    <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Parcel Management Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Parcel Management</CardTitle>
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
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <Input placeholder="Search by tracking ID or sender..." />

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParcels.map((parcel) => (
                  <TableRow key={parcel.id}>
                    <TableCell className="font-medium">{parcel.id}</TableCell>
                    <TableCell>{parcel.sender}</TableCell>
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
                    <TableCell>{parcel.district}</TableCell>
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
          </div>
        </CardContent>
      </Card>

      {/* Top Senders Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Top Senders Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSenders.map((sender, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">#{idx + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{sender.name}</p>
                    <p className="text-sm text-muted-foreground">{sender.parcels} parcels</p>
                  </div>
                </div>
                <p className="text-lg font-bold">{sender.revenue}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
