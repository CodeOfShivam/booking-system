"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { bookingColumns, type Booking } from "./columns";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import BookingDetailSheet from "./details";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/bookings/list");
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((item: any) => ({
            id: item._id,
            userId: item.userId,
            packageId: item.packageId,
            location: item.location,
            duration: item.selectedPlan?.duration || 0,
            price: item.selectedPlan?.price || 0,
            deliveryStart: item.deliveryTime?.startHour || null,
            deliveryEnd: item.deliveryTime?.endHour || null,
            totalAmount: item.priceBreakDown?.grandTotal || 0,
            status: item.status || "PENDING",
            startDate: item.startDate,
            endDate: item.endDate,
            document: item.document,
            address: item.address
              ? `${item.address.houseNumber}, ${item.address.buildingAreaName}, ${item.address.streetAddress}`
              : "N/A",
          }));
          setBookings(formatted);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Card className="p-4 relative">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          <span>Loading bookings...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : (
        <DataTable
          tableHeader="E-commerce Bookings"
          columns={bookingColumns(setSelectedBooking)}
          data={bookings}
          searchableColumns={["userId", "packageId", "location", "status"]}
          enableRowSelection={true}
          defaultPageSize={10}
          enableMultiSort={true}
          stickyHeader={true}
        />
      )}

      <BookingDetailSheet
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </Card>
  );
}
