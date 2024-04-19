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
    },
    orderStatus: {
      type: String,
    },
    itemOutForWork: {
      type: String,
    },
    itemCureentAvailavility: {
      type: String,
    },
    totalItemCount: {
      type: String,
    },
    isConsumableItem:{
        type: String 
    }
  },
  {
    timestamps: true,
  }
);


export const Inventary =  mongoose.model("inventary_items", inventarySchema)
