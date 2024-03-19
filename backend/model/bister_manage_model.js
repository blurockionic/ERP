import mongoose from "mongoose";

const orderBistarItemSchema = new mongoose.Schema({
  pillow: { type: Number, default: 0 },
  bed: { type: Number, default: 0 },
  chadar: { type: Number, default: 0 },
  bedsheet: { type: Number, default: 0 },
  blanket: { type: Number, default: 0 },
});

const orderedTentItemSchema = new mongoose.Schema({
  chair: {
    type: Number,
    default: 0,
  },
  mats: {
    type: Number,
    default: 0,
  },
  counters: {
    type: Number,
    default: 0,
  },
  galiche: {
    type: Number,
    default: 0,
  },
  normalTable: {
    type: Number,
    default: 0,
  },
  standingTable: {
    type: Number,
    default: 0,
  },
  roundedTable: {
    type: Number,
    default: 0,
  },
  beam: {
    type: Number,
    default: 0,
  },
  area: {
    type: String,
  },
  pillar: {
    type: Number,
    default: 0,
  },
  length: {
    type: Number,
    default: 0,
  },
  paya: {
    type: Number,
    default: 0,
  },
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
    orderTentItem: {
      type: orderedTentItemSchema,
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
