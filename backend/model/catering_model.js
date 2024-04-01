import mongoose from "mongoose";

// Define schema for breakfast
const BreakfastSchema = new mongoose.Schema({
  totalPackCount: String,
  snacks: [String],
  soupAndSalad: [String],
  mainCourse: [String]
});

// Define schema for lunch
const LunchSchema = new mongoose.Schema({
  totalPackCount: String,
  time: String,
  snacks: [String],
  mainCourse: [String],
  soupAndSalad: [String],
  iceCream: [String]
});

// Define schema for dinner
const DinnerSchema = new mongoose.Schema({
  totalPackCount: String,
  time: String,
  snacks: [String],
  mainCourse: [String],
  soupAndSalad: [String],
  iceCream: [String]
});

const cateringSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  breakfast: BreakfastSchema,
  lunch: LunchSchema,
  dinner: DinnerSchema,
});

export const Catering = mongoose.model("catering", cateringSchema);
