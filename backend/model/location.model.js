import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    id: String,
    latitude: Number,
    longitude: Number,
    updatedAt: { type: Date, default: Date.now }
  });
  
  export const Vehicle = mongoose.model('VehicleLocation', VehicleSchema);