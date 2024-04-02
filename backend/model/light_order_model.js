import mongoose from "mongoose";

const lightsOrdered = new mongoose.Schema({
  ladiWhite: {
    type: String,
  },
  ladiBlue: {
    type: String,
  },
  ladiRed: {
    type: String,
  },
  ladiVoilet: {
    type: String,
  },
  ladiPink: {
    type: String,
  },
  ladiYellow: {
    type: String,
  },
});

const lightSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    lights: lightsOrdered,
    fan: {
      type: String,
    },
    cooler: String,
    whiteLED: String,
    coloredLED: String,
    djLight: String,
    extension: String,
    jhumar: String,
    airConditioner: String,
    heater: String,
    generatorSet: String,
  },
  {
    timestamps: true,
  }
);

export const Light = mongoose.model("light_order", lightSchema);
