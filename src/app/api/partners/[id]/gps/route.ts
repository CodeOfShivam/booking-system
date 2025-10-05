import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Partner from "@/models/Partner";
import { redis, redisPub } from "@/lib/redis";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await the params
    const body = await req.json();
    const { lat, lng } = body;

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Latitude and longitude required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ Rate limit: max 6 updates per minute per partner
    const key = `gps_rate:${id}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > 6) {
      return NextResponse.json(
        { error: "Rate limit exceeded (6 updates per minute)" },
        { status: 429 }
      );
    }

    // ✅ Update partner location in MongoDB
    const partner = await Partner.findByIdAndUpdate(
      id,
      {
        $set: {
          "location.lat": lat,
          "location.lng": lng,
          "location.updatedAt": new Date(),
        },
      },
      { new: true }
    );

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    // ✅ Publish to Redis channel for live updates (for admin dashboard)
    const payload = {
      partnerId: id,
      lat,
      lng,
      updatedAt: new Date().toISOString(),
    };

    await redisPub.publish("partner:gps:update", JSON.stringify(payload));

    return NextResponse.json({
      success: true,
      message: "GPS location updated successfully",
      data: partner,
    });
  } catch (error) {
    console.error("GPS update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
