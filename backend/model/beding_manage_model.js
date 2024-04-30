import mongoose, { Schema } from "mongoose";

const orderBedingItemSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    pillow: { type: Number, default: 0 },
    bed: { type: Number, default: 0 },
    chadar: { type: Number, default: 0 },
    bedsheet: { type: Number, default: 0 },
    blanket: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const BedingManageModel = mongoose.model(
  "beding_order",
  orderBedingItemSchema
);
