import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Package, XCircle } from "lucide-react";
import { toast } from "sonner";

import { useCancelParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useGetSenderParcelsQuery } from "@/redux/features/dashboard/dashboard.api";
import CreateParcel from "./AddParcel";
import type { IParcel } from "@/interfaces/parcel.interface";

export default function SenderParcelTable() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ================= STATE =================
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // ================= API =================
  const { data, isLoading } = useGetSenderParcelsQuery({
    page,
    limit,
    search: search || undefined,
    status: status === "all" ? undefined : status.toUpperCase(),
  });

  const [cancelParcel] = useCancelParcelMutation();

  // ================= HELPERS =================
  const handleCancelParcel = async (id: string) => {
    try {
      const res = await cancelParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel parcel");
    }
  };

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

  const getPageNumbers = () => {
    if (!data?.meta) return [];

    const totalPages = data.meta.totalPages;
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  const parcels = data?.data || [];
  const meta = data?.meta;

  // ================= UI =================
  return (
    <div className=" p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Sent Parcels
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Total parcels: {meta?.total || 0}
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create New Parcel
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ================= FILTERS ================= */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search tracking ID or receiver..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <Select
              value={status}
              onValueChange={(val) => {
                setStatus(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="dispatched">Dispatched</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ================= TABLE ================= */}
          {parcels.length > 0 ? (
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(parcels as any).map((parcel: IParcel) => (
                    <TableRow key={parcel._id}>
                      <TableCell>{parcel.trackingId}</TableCell>
                      <TableCell>{parcel.receiver}</TableCell>
                      <TableCell>
                        {getStatusBadge(parcel.currentStatus as string)}
                      </TableCell>
                      <TableCell>{parcel.deliveryAddress}</TableCell>
                      <TableCell>
                        {new Date(parcel.deliveryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{parcel.weight} kg</TableCell>
                      <TableCell>৳{parcel.fee}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleCancelParcel(parcel._id as string)}
                              className="text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel
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
            <p className="text-center text-muted-foreground py-10">
              No parcels found
            </p>
          )}

          {/* ================= PAGINATION ================= */}
          {meta && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>

              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>

                {getPageNumbers().map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === page ? "default" : "outline"}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}

                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
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
