import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    repipeId: {
      type: String,
    },
    recipeName: {
      type: String,
      required,
    },
    recipeCategory: {
      type: String,
    },
    recipeSubCategory: {
      type: String,
    },
    recipeRawMaterial: [
      {
        itemName: String,
        itemQuantity: Number,
        itemQuantityUnit: String,
      },
    ],
    maxPaxCount: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model("recipe_management", recipeSchema);
