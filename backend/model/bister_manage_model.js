import mongoose from "mongoose";

const orderBistarItemSchema = new mongoose.Schema({
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
    orderType: {
      type: String,
    },
    otherDetails: {
      type: String,
    },
    orderBistarItems: {
      type: orderBistarItemSchema,
    },
    orderedTentItemName: {
      type: [String],
      default: []
    },
    orderedTentItemCount:{
      type:[String],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

export const BisterManageModel = mongoose.model(
  "bister_management",
  bisterSchema
);
