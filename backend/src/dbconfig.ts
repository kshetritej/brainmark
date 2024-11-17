import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const URI = process.env.DB_URI;

export async function connectDB() {
  try {
    mongoose.connect(URI!);
    console.log("Connected to MongoDB");
  } catch (err: any) {
    throw new Error(err);
  }
}
