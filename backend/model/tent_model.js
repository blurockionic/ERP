import mongoose from "mongoose";

const tentSchema = new mongoose.Schema({
    cutomerId: {
        type: String,
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
      },
      orderedItems:{
        type: [String],
        default: []
      },
      orderedItemsCount:{
        type: [String],
        default:[]
      }
})

export const Tent =  mongoose.model("tent_order", tentSchema)
