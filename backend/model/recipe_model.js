import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    recipeId: {
      type: String,
    },
    recipeName: {
      type: String,
    },
    recipeCategory: {
      type: String,
    },
    recipeSubCategory: {
      type: String,
    },
    recipeRawMaterial: [
      {
        ingredientName: String,
        ingredientQuantity: Number,
        ingredientUnit: String,
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
