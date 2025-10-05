"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { orderColumns, type CustomerOrder } from "./columns";
import { Card } from "@/components/ui/card";

export default function RecentOrdersPage() {
  // For demo purposes, we'll use mock data
  const [mockOrders] = useState<CustomerOrder[]>([
    {
      id: "ORD-001",
      customerName: "Mike Johnson",
      email: "mike.johnson@example.com",
      orderDate: "2023-04-15T12:00:00Z",
      totalItems: 3,
      status: "pending",
      totalAmount: 150,
      paymentMethod: "Credit Card",
      image: "/users/user-1.jpg",
    },
    {
      id: "ORD-002",
      customerName: "Elizabeth Smith",
      email: "elizabeth.smith@example.com",
      orderDate: "2023-05-20T14:30:00Z",
      totalItems: 5,
      status: "processing",
      totalAmount: 220,
      paymentMethod: "PayPal",
      image: "/users/user-2.jpg",
    },
    {
      id: "ORD-003",
      customerName: "John Doe",
      email: "john.doe@example.com",
      orderDate: "2023-06-10T09:15:00Z",
      totalItems: 2,
      status: "completed",
      totalAmount: 250,
      paymentMethod: "Bank Transfer",
      image: "/users/user-3.jpg",
    },
    {
      id: "ORD-004",
      customerName: "Jane Wilson",
      email: "jane.wilson@example.com",
      orderDate: "2023-07-05T16:45:00Z",
      totalItems: 4,
      status: "canceled",
      totalAmount: 180,
      paymentMethod: "Credit Card",
      image: "/users/user-4.jpg",
    },
    {
      id: "ORD-005",
      customerName: "Robert Brown",
      email: "robert.brown@example.com",
      orderDate: "2023-08-12T11:20:00Z",
      totalItems: 6,
      status: "completed",
      totalAmount: 275,
      paymentMethod: "PayPal",
      image: "/users/user-5.jpg",
    },
    {
      id: "ORD-006",
      customerName: "Sarah Miller",
      email: "sarah.miller@example.org",
      orderDate: "2023-09-18T08:30:00Z",
      totalItems: 1,
      status: "completed",
      totalAmount: 199,
      paymentMethod: "Cryptocurrency",
      image: "/users/user-6.jpg",
    },
    {
      id: "ORD-007",
      customerName: "David Clark",
      email: "david.clark@example.net",
      orderDate: "2023-10-22T13:45:00Z",
      totalItems: 3,
      status: "processing",
      totalAmount: 349,
      paymentMethod: "Credit Card",
      image: "/users/user-7.jpg",
    },
    {
      id: "ORD-008",
      customerName: "Emma Davis",
      email: "emma.davis@example.co",
      orderDate: "2023-11-05T10:15:00Z",
      totalItems: 2,
      status: "completed",
      totalAmount: -150, // Refund
      paymentMethod: "Bank Transfer",
      image: "/users/user-8.jpg",
    },
  ]);

  return (
    <>
      <Card className="p-4">
        <DataTable
          tableHeader="RECENT ORDERS"
          columns={orderColumns}
          data={mockOrders}
          searchableColumns={["name", "email"]}
          enableRowSelection={true}
          defaultPageSize={5}
          enableMultiSort={true}
          stickyHeader={true}
        />
      </Card>
    </>
  );
}
