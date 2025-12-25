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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IParcel } from '@/interfaces/parcel.interface';
import {
  useCancelParcelMutation,
  useConfirmParcelMutation,
  useMyParcelQuery,
} from '@/redux/features/parcel/parcel.api';
import { MoreHorizontal, Package, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import CreateParcel from './AddParcel';

export default function SenderParcelTable() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, isLoading } = useMyParcelQuery(undefined);
  const [confirmParcel] = useConfirmParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();

  // Filter states
  const [receivedSearch, setReceivedSearch] = useState('');
  const [receivedStatusFilter, setReceivedStatusFilter] = useState('all');
  const [sentSearch, setSentSearch] = useState('');
  const [sentStatusFilter, setSentStatusFilter] = useState('all');

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

  const handleCancelParcel = async (id: string) => {
    try {
      const res = await cancelParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel parcel');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
      requested: { variant: 'outline', label: 'Requested' },
      in_transit: { variant: 'default', label: 'In Transit' },
      dispatched: { variant: 'outline', label: 'Dispatched' },
      delivered: { variant: 'secondary', label: 'Delivered' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };

    const config = statusMap[status.toLowerCase()] || { variant: 'outline' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filterParcels = (parcels: IParcel[], search: string, statusFilter: string) => {
    return parcels.filter((parcel) => {
      const matchesSearch =
        search === '' ||
        parcel.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        (parcel.sender && parcel.sender.toLowerCase().includes(search.toLowerCase())) ||
        (parcel.receiver && parcel.receiver.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || (parcel.currentStatus as string).toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
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

  if (!data?.data) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Parcels Found</h2>
            <p className="text-muted-foreground text-center max-w-md">
              You haven't sent or received any parcels yet. Start by creating a new parcel shipment.
            </p>
            <Button  onClick={()=>setIsCreateModalOpen(true)} className="mt-6">Create New Parcel</Button>
          </CardContent>
        </Card>
         <CreateParcel 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
      </div>
    );
  }


  const receivedParcel = data.data.receivedParcel || [];
  const sendedParcel = data.data.sendedParcel || [];

  const filteredReceivedParcels = filterParcels(receivedParcel, receivedSearch, receivedStatusFilter);
  const filteredSentParcels = filterParcels(sendedParcel, sentSearch, sentStatusFilter);

  return (
    <div className="container mx-auto p-6 space-y-8">
     

      {/* Sent Parcels Section */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Sent Parcels
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Parcels you've sent ({sendedParcel.length})
            </p>
          </div>
          <Button onClick={()=>setIsCreateModalOpen(true)}>Create New Parcel</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search by tracking ID or receiver..."
              className="flex-1"
              value={sentSearch}
              onChange={(e) => setSentSearch(e.target.value)}
            />
            <Select value={sentStatusFilter} onValueChange={setSentStatusFilter}>
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
          {filteredSentParcels.length > 0 ? (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Receiver</TableHead>
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
                  {filteredSentParcels.map((parcel: IParcel) => (
                    <TableRow key={parcel._id}>
                      <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                      <TableCell>{parcel.receiver}</TableCell>
                      <TableCell>{getStatusBadge(parcel.currentStatus as string)}</TableCell>
                      <TableCell>{parcel?.deliveryLocation}</TableCell>
                      <TableCell>{parcel.deliveryAddress}</TableCell>
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
                              onClick={() => handleCancelParcel(parcel._id as string)}
                              className="cursor-pointer text-destructive focus:text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Parcel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {sentSearch || sentStatusFilter !== 'all'
                  ? 'No parcels match your filters'
                  : 'You haven\'t sent any parcels yet'}
              </p>
              <Button className="mt-4" variant="outline">
                Create Your First Parcel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
       {/* Received Parcels Section */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Receiving Parcels
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Parcels being sent to you ({receivedParcel.length})
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
            <Select value={receivedStatusFilter} onValueChange={setReceivedStatusFilter}>
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
          {filteredReceivedParcels.length > 0 ? (
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
                  {filteredReceivedParcels.map((parcel: IParcel) => (
                    <TableRow key={parcel._id}>
                      <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                      <TableCell>{parcel.sender}</TableCell>
                      <TableCell>{getStatusBadge(parcel.currentStatus as string)}</TableCell>
                     <TableCell>{parcel?.deliveryLocation}</TableCell>

                      <TableCell>{parcel.deliveryAddress}</TableCell>
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
                              onClick={() => handleConfirmParcel(parcel._id as string)}
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
          ) : (
            <div className="text-center py-12 border rounded-md">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {receivedSearch || receivedStatusFilter !== 'all'
                  ? 'No parcels match your filters'
                  : 'You don\'t have any receiving parcels'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

       <CreateParcel 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}