import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI missing");

let clientPromise: Promise<typeof mongoose> | null = null;

export function connectDB() {
  if (mongoose.connection.readyState >= 1) return Promise.resolve(mongoose);
  if (!clientPromise) {
    clientPromise = mongoose.connect(MONGODB_URI, { dbName: "rentkar" });
  }
  return clientPromise;
}
