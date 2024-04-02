import mongoose from "mongoose";

const decorationSchema = mongoose.Schema({
    cutomerId: {
        type: String,
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
      },
      decorationOrderedItem:{
        type:[String],
        default: []
      },
      decorationOrderedCount:{
        type:[String],
        default: []
      }
})

export const Decoration = mongoose.model("decoration_order", decorationSchema)