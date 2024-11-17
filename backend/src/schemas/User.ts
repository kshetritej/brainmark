import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      min: [3, "Username must be at least 3 characters"],
      max: [20, "Username must be at most 20 characters"],
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

export const User = model("User", schema);
