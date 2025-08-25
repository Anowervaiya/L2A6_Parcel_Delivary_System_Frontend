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
  useCancelParcelMutation,
  useConfirmParcelMutation,
  useMyParcelQuery,
} from '@/redux/features/parcel/parcel.api';
import {  MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { statusColors } from '@/constants/parcelType';
import { toast } from 'sonner';

export default function MyParcel() {
  const { data } = useMyParcelQuery(undefined);
  const [confirmParcel] = useConfirmParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();

  if (!data) {
    return (
      <h1>Sorry bro! you have not sent any parcel or received any parcel </h1>
    );
  }

  const handleConfirmParcel = async (id: string) => {
    try {
      const res = await confirmParcel(id).unwrap();
      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleCancelParcel = async (id: string) => {
    try {
      const res = await cancelParcel(id).unwrap();
      if (res.data.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const receivedParcel = data?.data?.receivedParcel;
  const sendedParcel = data?.data?.sendedParcel;

  return (
    <div className="container mx-auto">
      <div>
        <div>
          <h1 className="font-bold text-2xl pb-4">Receiving parcel</h1>
        </div>
        {receivedParcel.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Sender Email</TableHead>
               
                <TableHead>Status</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-end">Confirm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivedParcel.map((parcel: IParcel) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {parcel.trackingId}
                  </TableCell>
                  <TableCell>
                    {parcel.sender}
                  </TableCell>
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
                  <TableCell>{parcel.deliveryAddress}</TableCell>

                  <TableCell>
                    {new Date(parcel.deliveryDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{parcel.weight} kg</TableCell>
                  <TableCell>{parcel.fee}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                          onClick={() =>
                            handleConfirmParcel(parcel?._id as string)
                          }
                        >
                          Confirm{' '}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h1>You don't have any receiving parcel</h1>
        )}
      </div>

      <div className='pt-8'>
        <div>
          <h1 className="font-bold text-2xl">Sent parcel</h1>
        </div>
        {sendedParcel.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Receiver Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className='text-end'>Cancel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sendedParcel.map((parcel: IParcel) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {parcel.trackingId}
                  </TableCell>
                  <TableCell>
                    {parcel.receiver}
                  </TableCell>
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
                  <TableCell>{parcel.deliveryAddress}</TableCell>

                  <TableCell>
                    {new Date(parcel.deliveryDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{parcel.weight} kg</TableCell>
                  <TableCell>{parcel.fee}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                          onClick={() =>
                            handleCancelParcel(parcel._id as string)
                          }
                        >
                          Cancel{' '}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h1>You don't have any sent parcel</h1>
        )}
      </div>
    </div>
  );
}
