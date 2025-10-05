import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();
    // Fetch bookings, limit 50
    const bookings = await Booking.find().limit(50).lean();

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
