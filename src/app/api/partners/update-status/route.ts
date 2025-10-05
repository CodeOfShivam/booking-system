import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Partner from "@/models/Partner";
import { redis, redisPub } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status || !["online", "offline"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Missing id or invalid status" },
        { status: 400 }
      );
    }

    await connectDB();

    // Optional: simple rate limit (1 update per 10 seconds per partner)
    const rateKey = `partner_status_rate:${id}`;
    const rate = await redis.incr(rateKey);
    if (rate === 1) await redis.expire(rateKey, 10);
    if (rate > 1) {
      return NextResponse.json(
        { success: false, message: "Too many status updates, try again later" },
        { status: 429 }
      );
    }

    // Update status in MongoDB
    const partner = await Partner.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          lastStatusUpdate: new Date(),
        },
      },
      { new: true }
    );

    if (!partner) {
      return NextResponse.json(
        { success: false, message: "Partner not found" },
        { status: 404 }
      );
    }

    // Broadcast via Redis pub/sub for real-time dashboards
    const payload = {
      partnerId: id,
      status,
      updatedAt: new Date().toISOString(),
    };

    await redisPub.publish("partner:status:update", JSON.stringify(payload));

    return NextResponse.json({
      success: true,
      message: `Partner marked as ${status}`,
      data: partner,
    });
  } catch (error) {
    console.error("Partner status update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
