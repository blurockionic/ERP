import mongoose, { model } from "mongoose";

const inventarySchema = new mongoose.Schema(
  {
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
      type: String,
    },
    itemCureentAvailability: {
      type: String,
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
