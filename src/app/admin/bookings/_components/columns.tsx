"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleChevronRight, MapPin } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
export type Document = {
  docType: string;
  docLink: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type Booking = {
  id: string;
  userId: string;
  packageId: string;
  location: string;
  duration: number;
  price: number;
  deliveryStart: number | null;
  deliveryEnd: number | null;
  totalAmount: number;
  status: string;
  startDate: string;
  endDate: string;
  address: string;
  document: Document[];
};

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "CONFIRMED"
      ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      : status === "PENDING"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-1 text-xs ${styles}`}
    >
      {status}
    </Badge>
  );
}

export const bookingColumns = (
  setSelectedBooking: (booking: Booking) => void
): ColumnDef<Booking>[] => [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "packageId",
    header: "Package ID",
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration (Days)",
  },
  {
    accessorKey: "price",
    header: "Base Price",
    cell: ({ row }) => `₹${row.getValue("price")}`,
  },
  {
    accessorKey: "totalAmount",
    header: "Grand Total",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        ₹{row.getValue("totalAmount")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery Window",
    cell: ({ row }) =>
      `${row.original.deliveryStart || "--"}:00 - ${
        row.original.deliveryEnd || "--"
      }:00`,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-sm text-muted-foreground">
        {row.getValue("address")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
            onClick={() => setSelectedBooking(booking)}
          >
            <CircleChevronRight className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
