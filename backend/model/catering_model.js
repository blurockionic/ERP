import mongoose from "mongoose";


const cateringSchema =  new mongoose.Schema({
    cutomerId: {
        type: String,
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
      },
      orderedBreakFastItems:{
        type: [String],
        default: []
      },
      orderedLaunchItems:{
        type: [String],
        default:[]
      },
      orderedDinnerItems:{
        type:[String],
        default:[]
      }
})

export const Catering =  mongoose.model("catering", cateringSchema)