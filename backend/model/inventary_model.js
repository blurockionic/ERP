import mongoose, { model } from "mongoose";

const inventarySchema = new mongoose.Schema(
  {
    itemId:{
      type: String
    },
    itemName: {
      type: String,
    },
    itemCategoryType: {
      type: String,
    },
    itemSize: {
      type: String,
    },
    isStockAvailable: {
      type: Boolean,
      default: false 
    },
    orderStatus: {
      type: String,
    },
    itemOutForWork: {
      type: Number,
    },
    itemCurrentAvailability: {
      type: Number,
    },
    totalItemQuantity: {
      type: String,
    },
    isConsumable:{
        type: Boolean,
        default: false
    },
  
  },
  {
    timestamps: true,
  }
);


export const Inventary =  mongoose.model("inventary_items", inventarySchema)
