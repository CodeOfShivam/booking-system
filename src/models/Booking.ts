import mongoose, { Schema } from "mongoose";

const DocumentSchema = new Schema(
  {
    docType: String,
    docLink: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    buildingAreaName: String,
    houseNumber: String,
    streetAddress: String,
    zip: String,
    latitude: Number,
    longitude: Number,
  },
  { _id: false }
);

const BookingSchema = new Schema({
  userId: String,
  packageId: String,
  startDate: Date,
  endDate: Date,
  isSelfPickup: Boolean,
  location: String,
  deliveryTime: Object,
  selectedPlan: Object,
  priceBreakDown: Object,
  document: [DocumentSchema],
  address: AddressSchema,
  partnerId: { type: String, default: null },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
  },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
