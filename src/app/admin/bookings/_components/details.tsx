"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import type { Booking } from "./columns";

export type Document = {
  docType: string;
  docLink: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

interface Props {
  booking: Booking | null;
  onClose: () => void;
}

export default function BookingDetailSheet({ booking, onClose }: Props) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDoc, setLoadingDoc] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   Document state management
  useEffect(() => {
    if (booking?.document) {
      setDocuments(booking.document);
    } else {
      setDocuments([]);
    }
  }, [booking]);

  // Assign & Confirm Booking
  const handleAssignAndConfirm = async () => {
    if (!booking) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to assign booking");
      }

      alert(`Booking assigned to partner: ${data.partnerId}`);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  // ✅ Approve Document
  const handleApprove = async (docType: string) => {
    setLoadingDoc(docType);
    try {
      const res = await fetch(`/api/bookings/${booking.id}/approve-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType }),
      });

      if (!res.ok) throw new Error("Failed to approve document");
      const data = await res.json();

      if (data.success) {
        // update state
        setDocuments((prev) =>
          prev.map((d) =>
            d.docType === docType ? { ...d, status: "APPROVED" } : d
          )
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to approve document");
    } finally {
      setLoadingDoc(null);
    }
  };

  return (
    <Sheet open={!!booking} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[500px] p-0 flex flex-col">
        {/* Header */}
        <div className="border-b">
          <SheetHeader>
            <SheetTitle>E-Commerce Booking Details</SheetTitle>
            <SheetDescription>
              Review and approve uploaded documents before confirmation.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Booking Info */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">User ID:</p>
            <p className="font-medium">{booking.userId}</p>

            <p className="text-muted-foreground">Package ID:</p>
            <p className="font-medium">{booking.packageId}</p>

            <p className="text-muted-foreground">Location:</p>
            <p className="font-medium">{booking.location}</p>

            <p className="text-muted-foreground">Duration:</p>
            <p className="font-medium">{booking.duration} day(s)</p>

            <p className="text-muted-foreground">Price:</p>
            <p className="font-medium">₹{booking.price}</p>

            <p className="text-muted-foreground">Total Amount:</p>
            <p className="font-semibold">₹{booking.totalAmount}</p>

            <p className="text-muted-foreground">Status:</p>
            <Badge
              variant="outline"
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                booking.status === "CONFIRMED"
                  ? "text-green-600 border-green-400"
                  : booking.status === "PENDING"
                  ? "text-amber-600 border-amber-400"
                  : "text-red-600 border-red-400"
              }`}
            >
              {booking.status}
            </Badge>

            <p className="text-muted-foreground">Address:</p>
            <p className="font-medium">{booking.address}</p>
          </div>

          <Separator />

          {/* Document Section */}
          <div className="space-y-2">
            <p className="font-semibold text-sm text-foreground">
              Uploaded Documents
            </p>

            <div className="flex flex-col gap-2">
              {documents && documents.length > 0 ? (
                documents.map((doc) => (
                  <div
                    key={doc.docType}
                    className="flex justify-between items-center rounded-md border p-2"
                  >
                    <div>
                      <p className="font-medium">{doc.docType}</p>
                      <a
                        href={doc.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        View Document
                      </a>
                    </div>

                    {doc.status === "APPROVED" ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-400"
                      >
                        Approved
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={loadingDoc === doc.docType}
                        onClick={() => handleApprove(doc.docType)}
                      >
                        {loadingDoc === doc.docType
                          ? "Approving..."
                          : "Approve"}
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No documents uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-2">
          <SheetClose asChild>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </SheetClose>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAssignAndConfirm}
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign & Confirm"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
}
