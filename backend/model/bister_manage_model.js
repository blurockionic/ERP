import mongoose, { Schema } from "mongoose";

const orderBistarItemSchema = new mongoose.Schema(
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

export const BisterManageModel = mongoose.model(
  "bister_order",
  orderBistarItemSchema
);
