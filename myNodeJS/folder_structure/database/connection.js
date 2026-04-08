import dotenv from "dotenv";
dotenv.config({ quiet: true });
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDB_database);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;