import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  pillow: { type: Number, default: 0 },
  bed: { type: Number, default: 0 },
  chadar: { type: Number, default: 0 },
  bedsheet: { type: Number, default: 0 },
  blanket: { type: Number, default: 0 },
});

const bisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    alternatePhone: {
      type: String,
    },
    address: {
      type: String,
    },
    dateAndTime: {
      type: String,
    },
    orderType:{
        type:String
    },
    otherDetails: {
      type: String,
    },
    orderItems: {
      type: orderItemSchema,
    },
  },
  {
    timestamps: true,
  }
);

export const BisterManageModel = mongoose.model(
  "bister_management",
  bisterSchema
);
