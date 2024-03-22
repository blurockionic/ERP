import mongoose from "mongoose";

const lightSchema =  new mongoose.Schema({
    cutomerId: {
        type: String,
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
      },
      lightOrderedItem:{
        type:[String],
        default: []
      },
      lightOrderedCount:{
        type:[String],
        default: []
      }
})

export const Light = mongoose.model("light_order", lightSchema)