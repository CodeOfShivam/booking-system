"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { formatCurrency, formatDate } from "@/lib/data-table-utils";
import Image from "next/image";

export type CustomerOrder = {
  id: string;
  customerName: string;
  email: string;
  orderDate: string;
  totalItems: number;
  status: "pending" | "processing" | "completed" | "canceled";
  totalAmount: number;
  paymentMethod: string;
  image: string;
};

export const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

export const orderColumns: ColumnDef<CustomerOrder>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const image = row.original.image;
      const name: string = row.getValue("customerName");
      const email = row.original.email;

      return (
        <div className="flex items-center space-x-3">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div>
            <div className="font-medium text-sm text-gray-900">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => <div>{formatDate(row.getValue("orderDate"))}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const badgeVariant =
        status === "completed"
          ? "success"
          : status === "processing"
          ? "outline"
          : status === "pending"
          ? "secondary"
          : "destructive";

      return (
        <Badge variant={badgeVariant} className="capitalize">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = Number(row.getValue("totalAmount"));
      return (
        <div className="text-left font-medium">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Contact Customer</DropdownMenuItem>
            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
