import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    dbName: "ERP_Solution", // MongoDB database name
  })
    .then(() => console.log("ERP solution database connected."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};
