import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    customerPhoneNumber: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    otherDetails: {
      type: String,
    },
    dateAndTime: {
      type: Date,
    },

    // updated
    status: {
        type: String,
        required: true,
      },
    isTentOrdered:{
        type:Boolean,
        default: false

    },
    isCateringOrdered: {
      type: Boolean,
      default: false,
    },
    isDecorationOrdered: {
      type: Boolean,
      default: false,
    },
    isBistarOrdered: {
      type: Boolean,
      default: false,
    },
    isLightOrdered: {
      type: Boolean,
      default: false,
    },
    isFinalOrderSubmited: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      default: "pendingn"
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("customers", customerSchema);
