import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { acquireLock, releaseLock } from "@/lib/lock";
import { redisPub } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // if (!bookingId) {
    return NextResponse.json(
      { error: "bookingId required" + bookingId },
      { status: 400 }
    );
    // }

    // // Connect to DB
    // await connectDB();

    // const lockKey = `booking:confirm:${bookingId}`;
    // const token = await acquireLock(lockKey, 5000); // 5 seconds lock

    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Could not acquire lock" },
    //     { status: 409 }
    //   );
    // }

    // try {
    //   const booking = await Booking.findById(bookingId);

    //   if (!booking) {
    //     return NextResponse.json(
    //       { error: "Booking not found" },
    //       { status: 404 }
    //     );
    //   }

    //   if (booking.status === "CONFIRMED") {
    //     return NextResponse.json(
    //       { error: "Already confirmed" },
    //       { status: 400 }
    //     );
    //   }

    //   const allApproved = (booking.document || []).every(
    //     (d: any) => d.status === "APPROVED"
    //   );

    //   if (!allApproved) {
    //     return NextResponse.json(
    //       { error: "Not all documents approved" },
    //       { status: 400 }
    //     );
    //   }

    //   booking.status = "CONFIRMED";
    //   await booking.save();

    //   await redisPub.publish(
    //     "booking:confirmed",
    //     JSON.stringify({ bookingId })
    //   );

    //   return NextResponse.json({ ok: true });
    // } finally {
    //   await releaseLock(lockKey, token);
    // }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
