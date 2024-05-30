import mongoose from "mongoose";

const purchaseSchama =  new mongoose.Schema({
    item:{
        type:String
    }, 
    itemName:{
        type:String,
    },
    itemQuantity:{
        type:Number
    },
    itemQuantityUnit:{
        type:String
    },

},{
    timestamps: true
})

export const PurchaseIngredient = mongoose.model("Ingredient_inventory", purchaseSchama)