import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await context.params; // ✅ await params in Next.js 15
    const { docType } = await req.json();

    if (!bookingId || !docType) {
      return NextResponse.json(
        { success: false, message: "Missing bookingId or docType" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // ✅ Update document status
    const updatedDocs = booking.document.map((doc: any) =>
      doc.docType === docType ? { ...doc, status: "APPROVED" } : doc
    );

    booking.document = updatedDocs;
    await booking.save();

    return NextResponse.json({
      success: true,
      message: `${docType} document approved`,
    });
  } catch (error) {
    console.error("Document approval error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while approving document" },
      { status: 500 }
    );
  }
}
