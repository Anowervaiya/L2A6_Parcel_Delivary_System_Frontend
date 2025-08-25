import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllParcelQuery } from '@/redux/features/parcel/parcel.api';
import { useAllUserQuery } from '@/redux/features/user/user.api';


export default function Analytics() {
  // Fetch data for all users
  const {
    data: userData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useAllUserQuery(undefined);

  // Fetch data for all parcels
  const {
    data: parcelData,
    isLoading: isParcelsLoading,
    isError: isParcelsError,
  } = useAllParcelQuery(undefined);

  // Handle loading states
  if (isUsersLoading || isParcelsLoading) {
    return <div>Loading summary data...</div>;
  }

  // Handle error states
  if (isUsersError || isParcelsError) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  const totalUsers = userData?.data?.length ?? 0;
  const totalParcels = parcelData?.data?.length ?? 0;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Site Summary</h2>
      <Table className="w-full max-w-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Metric</TableHead>
            <TableHead className="w-1/2">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Total Users</TableCell>
            <TableCell>{totalUsers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Parcels</TableCell>
            <TableCell>{totalParcels}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
