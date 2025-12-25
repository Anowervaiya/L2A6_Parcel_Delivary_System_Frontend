import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import type { IParcel } from '@/interfaces/parcel.interface';
import {
  useConfirmParcelMutation,
} from '@/redux/features/parcel/parcel.api';
import { 
  useGetReceiverParcelsQuery 
} from '@/redux/features/dashboard/dashboard.api';
import { MoreHorizontal, Package, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';


 const getStatusBadge = (status: string) => {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    requested: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Requested" },
    in_transit: { bg: "bg-blue-100", text: "text-blue-800", label: "In Transit" },
    dispatched: { bg: "bg-purple-100", text: "text-purple-800", label: "Dispatched" },
    delivered: { bg: "bg-green-100", text: "text-green-800", label: "Delivered" },
    cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
  };

  const config = map[status.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800", label: status };

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {config.label}
    </span>
  );
};



export default function ReceiverParcels() {
  const [confirmParcel] = useConfirmParcelMutation();

  // Filter states
  const [receivedSearch, setReceivedSearch] = useState('');
  const [receivedStatusFilter, setReceivedStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch data with filters
  const { data: receivedParcel, isLoading } = useGetReceiverParcelsQuery({
    page: currentPage,
    limit: 10,
    status: receivedStatusFilter !== 'all' ? receivedStatusFilter.toUpperCase() : undefined,
    search: receivedSearch || undefined,
  });

  const handleConfirmParcel = async (id: string) => {
    try {
      const res = await confirmParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to confirm parcel');
    }
  };


  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your parcels...</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Extract parcels from response
  const parcels = receivedParcel?.data?.parcels || [];
  const pagination = receivedParcel?.data?.pagination;

  return (
    <div className=" p-6 space-y-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Receiving Parcels
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Parcels being sent to you ({pagination?.total || 0})
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search by tracking ID or sender..."
              className="flex-1"
              value={receivedSearch}
              onChange={(e) => setReceivedSearch(e.target.value)}
            />
            <Select
              value={receivedStatusFilter}
              onValueChange={setReceivedStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="dispatched">Dispatched</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {parcels.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Delivery Division</TableHead>
                      <TableHead>Delivery Address</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(parcels as any)?.map((parcel: IParcel) => (
                      <TableRow key={parcel._id}>
                        <TableCell className="font-medium">
                          {parcel.trackingId}
                        </TableCell>
                        <TableCell>{parcel.sender}</TableCell>
                                              <TableCell>{getStatusBadge(parcel.currentStatus as string)}</TableCell>

                        <TableCell>{parcel.deliveryLocation}</TableCell>
                        <TableCell className="max-w-50 truncate">
                          {parcel.deliveryAddress}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(parcel.deliveryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{parcel.weight} kg</TableCell>
                        <TableCell>৳{parcel.fee}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleConfirmParcel(parcel._id as string)
                                }
                                className="cursor-pointer"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirm Delivery
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* ✅ Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {parcels.length} of {pagination.total} parcels
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {receivedSearch || receivedStatusFilter !== 'all'
                  ? 'No parcels match your filters'
                  : "You don't have any receiving parcels"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}