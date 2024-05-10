import mongoose from "mongoose";

const BreakfastSchema = new mongoose.Schema({
  totalPackCount: String,
  snacks: [String],
  soupAndSalad: [String],
  mainCourse: [String],
});

// Define schema for lunch
const LunchSchema = new mongoose.Schema({
  totalPackCount: String,
  time: String,
  snacks: [String],
  mainCourse: [String],
  soupAndSalad: [String],
  iceCream: [String],
});

// Define schema for dinner
const DinnerSchema = new mongoose.Schema({
  totalPackCount: String,
  time: String,
  snacks: [String],
  mainCourse: [String],
  soupAndSalad: [String],
  iceCream: [String],
});

const customerOrder = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    customerPhoneNumber: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    otherDetails: {
      type: String,
    },
    dateAndTime: {
      type: Date,
    },
    isCateringOrdered: {
      type: Boolean,
      default: false,
    },
    isTentOrdered: {
      type: Boolean,
      default: false,
    },
    isBistarOrdered: {
      type: Boolean,
      default: false,
    },
    isLightOrdered: {
      type: Boolean,
      default: false,
    },
    isDecorationOrdered: {
      type: Boolean,
      default: false,
    },
    tentOrder: [
      {
        itemNameTent: String,
        itemCountForOrderTent: String,
      },
    ],
    lightOrder: [
      {
        itemNameLight: String,
        itemCountForOrderLight: String,
      },
    ],
    bistarOrder: [
      {
        itemNameBistar: String,
        itemCountForOrderBistar: String,
      },
    ],
    cateringOrder: {
      breakfast: BreakfastSchema,
      lunch: LunchSchema,
      dinner: DinnerSchema,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerOrder = mongoose.model("order", customerOrder);
