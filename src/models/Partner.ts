import mongoose, { Schema } from "mongoose";

const PartnerSchema = new Schema({
  _id: String,
  name: String,
  city: String,
  status: { type: String, enum: ["online", "offline"], default: "online" },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  lastUpdatedAt: Date,
});

export default mongoose.models.Partner ||
  mongoose.model("Partner", PartnerSchema);
