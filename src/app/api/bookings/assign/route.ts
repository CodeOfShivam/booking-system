import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Partner from "@/models/Partner";
import { acquireLock, releaseLock } from "@/lib/lock";
import { redisPub } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId required" },
        { status: 400 }
      );
    }

    await connectDB();

    const lockKey = `booking:assign:${bookingId}`;
    const token = await acquireLock(lockKey, 5000);

    if (!token) {
      return NextResponse.json(
        { error: "Could not acquire lock" },
        { status: 409 }
      );
    }
    0;
    try {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      if (booking.partnerId) {
        return NextResponse.json(
          { error: "Already assigned" },
          { status: 400 }
        );
      }

      // Find nearest partner using geo location
      const [lng, lat] = [booking.address.longitude, booking.address.latitude];

      const partner = await Partner.findOne({
        status: "online",
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lng, lat] },
          },
        },
      }).limit(1);

      if (!partner) {
        return NextResponse.json(
          { error: "No partner found" },
          { status: 404 }
        );
      }

      booking.partnerId = partner._id;
      await booking.save();

      // Publish to Redis Pub/Sub
      await redisPub.publish(
        "booking:assigned",
        JSON.stringify({ bookingId, partnerId: partner._id })
      );

      return NextResponse.json({ ok: true, partnerId: partner._id });
    } finally {
      await releaseLock(lockKey, token);
    }
  } catch (error) {
    console.error("Error assigning booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
