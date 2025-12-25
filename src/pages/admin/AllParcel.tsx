import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Search } from "lucide-react";
import { toast } from "sonner";

import type { IParcel } from "@/interfaces/parcel.interface";
import {
  useAllParcelQuery,
  useChangeParcelStatusMutation,
  useDeleteParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import { ParcelStatus, statusColors } from "@/constants/parcelType";

export default function AllParcel() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, refetch } = useAllParcelQuery({
    page,
    limit,
    search: search || undefined,
    status: status && status !== "all" ? status.toUpperCase() : undefined,
  });

  const [deleteParcel] = useDeleteParcelMutation();
  const [changeParcelStatus] = useChangeParcelStatusMutation();

  const parcels = data?.data || [];
  const meta = data?.meta;

  // 🔹 Actions
  const handleDeleteParcel = async (id: string) => {
    try {
      const res = await deleteParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  const handleStatusChange = async (id: string, value: string) => {
    try {
      const res = await changeParcelStatus({ id, status: value }).unwrap();
      if (res.success) {
        toast.success(res.message);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Status update failed");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError)
    return <div className="p-10 text-center">Something went wrong</div>;

  const totalPages = meta?.totalPages || 1;

  // 🔹 Generate page numbers for pagination (limit to 5 pages visible)
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">All Parcels</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tracking, sender, receiver..."
              className="pl-8 w-[260px]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Status Filter */}
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {Object.values(ParcelStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change Status</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.length > 0 ? (
              (parcels as any).map((parcel: IParcel) => (
                <TableRow key={parcel._id}>
                  <TableCell>{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.sender}</TableCell>
                  <TableCell>{parcel.receiver}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        parcel.currentStatus === ParcelStatus.REQUESTED
                          ? "bg-yellow-100 text-yellow-800"
                          : parcel.currentStatus === ParcelStatus.IN_TRANSIT
                          ? "bg-blue-100 text-blue-800"
                          : parcel.currentStatus === ParcelStatus.DISPATCHED
                          ? "bg-purple-100 text-purple-800"
                          : parcel.currentStatus === ParcelStatus.DELIVERED
                          ? "bg-green-100 text-green-800"
                          : parcel.currentStatus === ParcelStatus.CANCELLED
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {parcel.currentStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        handleStatusChange(parcel._id as string, value)
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder={parcel.currentStatus} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ParcelStatus).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>{parcel.deliveryAddress}</TableCell>
                  <TableCell>
                    {new Date(parcel.deliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{parcel.weight} kg</TableCell>
                  <TableCell>৳{parcel.fee}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteParcel(parcel._id as string)}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  No parcel found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages} • Total {meta.total}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            {getPageNumbers().map((pNum) => (
              <Button
                key={pNum}
                variant={page === pNum ? "default" : "outline"}
                onClick={() => setPage(pNum)}
              >
                {pNum}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
