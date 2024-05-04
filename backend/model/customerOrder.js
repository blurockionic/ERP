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

const customerOrder = new mongoose.Schema({
  orderId: {
    type: String,
  },
  orderStatus:{
    type: String
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
});

export const CustomerOrder =  mongoose.model("order", customerOrder)
