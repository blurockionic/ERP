import mongoose, { Schema } from "mongoose";

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
// Define schema for other Related Items
const OtherRelatedItemSchema = new mongoose.Schema({
  relatedItemsName: String,
  relatedItemsCount: String,
});

const customerOrder = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
    customerName: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from the beginning and end of the string
    },
    customerAddress: {
      type: String,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from the beginning and end of the string
    },
    customerEmail: {
      type: String,
      trim: true,
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

    tentOrder: {
      itemList: [
        {
          itemNameTent: String,
          itemCountForOrderTent: String,
          // add tent area for the items
        },
      ],
      tentArea: {
        type: String,
      },
    },
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
    cateringOrder: [
      {
        mealType: String,
        mealTime: String,
        peopleCount: String,
        recipe: [String],
        selectedBeverages: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CustomerOrder = mongoose.model("order", customerOrder);
