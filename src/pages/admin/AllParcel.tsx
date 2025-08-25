import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IParcel } from '@/interfaces/parcel.interface';
import {
  useAllParcelQuery,
  useChangeParcelStatusMutation,
  useDeleteParcelMutation,
  useFilterByStatusQuery,
} from '@/redux/features/parcel/parcel.api';
import {  Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ParcelStatus, statusColors } from '@/constants/parcelType';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export default function AllParcel() {
  const [displayedParcels, setDisplayedParcels] = useState([]);
  const [filterByStatus, setfilterByStatus] = useState('');
  const [deleteParcel] = useDeleteParcelMutation();
  const [changeParcelStatus] = useChangeParcelStatusMutation();

  const {
    data: allParcelData,
    isLoading: allLoading,
    isError: allError,
  } = useAllParcelQuery(undefined);

  const {
    data: filteredParcelData,
    isLoading: filterLoading,
    isError: filterError,
    
  } = useFilterByStatusQuery(
    {
      status: filterByStatus,
    },
    {
      skip: filterByStatus === '',
    }
  );

  
  useEffect(() => {
    if (filterByStatus) {
      setDisplayedParcels(filteredParcelData?.data);
    } else {
      setDisplayedParcels(allParcelData?.data);
    }
  }, [allParcelData, filteredParcelData, filterByStatus]);

  const isLoading = filterByStatus ? filterLoading : allLoading;
  const isError = filterByStatus ? filterError : allError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Sorry bro!</div>;
  }

  if (!displayedParcels || displayedParcels.length === 0) {
    return <h1>No Parcel Found</h1>;
  }

  const handleDeleteParcel = async (id: string) => {
    try {
      const res = await deleteParcel(id).unwrap();
      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleStatusChange = async (id: string, value: string) => {
    const payload = {
      id,
      status: value,
    };
    try {
      const res = await changeParcelStatus(payload).unwrap();

      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleFilterBystatus = async (value: string) => {
    setfilterByStatus(value);
  };
  return (
    <div className="container mx-auto">
      <div>
        <div className="flex gap-6">
          <h1 className="font-bold text-2xl">All parcel</h1>
          <Select onValueChange={handleFilterBystatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value={ParcelStatus.APPROVED}>APPROVED</SelectItem>
                <SelectItem value={ParcelStatus.CANCELLED}>
                  CANCELLED
                </SelectItem>
                <SelectItem value={ParcelStatus.DELIVERED}>
                  DELIVERED
                </SelectItem>
                <SelectItem value={ParcelStatus.DISPATCHED}>
                  DISPATCHED
                </SelectItem>
                <SelectItem value={ParcelStatus.IN_TRANSIT}>
                  IN_TRANSIT
                </SelectItem>
                <SelectItem value={ParcelStatus.REQUESTED}>
                  REQUESTED
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender Email</TableHead>
              <TableHead>Receiver Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change Status</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedParcels?.map((parcel: IParcel) => (
              <TableRow>
                <TableCell className="font-medium">
                  {parcel.trackingId}
                </TableCell>
                <TableCell className="font-medium">{parcel.sender}</TableCell>
                <TableCell className="font-medium">{parcel.receiver}</TableCell>

                <TableCell>
                  <span
                    style={{
                      color: parcel.currentStatus
                        ? statusColors[parcel.currentStatus]
                        : undefined,
                    }}
                    className={`
      ${parcel.currentStatus ? statusColors[parcel.currentStatus] : ''} 
      flex items-center space-x-2 
      font-semibold`}
                  >
                    <svg viewBox="0 0 8 8" className="w-2 h-2 fill-current">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    <span>{parcel.currentStatus}</span>
                  </span>
                </TableCell>

                <TableCell>
                  <Select
                    onValueChange={value =>
                      handleStatusChange(parcel._id as string, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={parcel.currentStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ParcelStatus.APPROVED}>
                        {ParcelStatus.APPROVED}
                      </SelectItem>
                      <SelectItem value={ParcelStatus.DISPATCHED}>
                        {ParcelStatus.DISPATCHED}
                      </SelectItem>
                      <SelectItem value={ParcelStatus.IN_TRANSIT}>
                        {ParcelStatus.IN_TRANSIT}
                      </SelectItem>
                      <SelectItem value={ParcelStatus.CANCELLED}>
                        {ParcelStatus.CANCELLED}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{parcel.deliveryAddress}</TableCell>

                <TableCell>
                  {new Date(parcel.deliveryDate).toLocaleDateString()}
                </TableCell>

                <TableCell>{parcel.weight} kg</TableCell>
                <TableCell>{parcel.fee}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={'outline'}
                    onClick={() => handleDeleteParcel(parcel?._id as string)}
                  >
                    {' '}
                    <Trash2 color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
