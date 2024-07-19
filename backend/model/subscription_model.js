import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    softwareName: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["Basic", "Standard", "Premium"],
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Cancelled"],
      default: "Active",
    },
    paymentStaus: {
      type: String,
      default: "Pending",
    },
    paymentHistory: [
      {
        invoiceId: String,
        amount: Number,
        date: Date,
        status: {
          type: String,
          enum: ["Paid", "Pending", "Failed"],
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
