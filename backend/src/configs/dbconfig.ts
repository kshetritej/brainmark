import mongoose from "mongoose";
import { DB_URI } from "./envConfig";

export async function connectDB() {
  try {
    mongoose.connect(DB_URI!);
    console.log("Connected to MongoDB");
  } catch (err: any) {
    throw new Error(err);
  }
}
