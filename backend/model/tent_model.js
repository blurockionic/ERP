import mongoose from "mongoose";

const tentSchema = new mongoose.Schema({
    customerId: {
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
      },
      area:{
        type: String
      }

})

export const Tent =  mongoose.model("tent_order", tentSchema)
