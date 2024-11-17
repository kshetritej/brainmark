import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [3, "Name must be at least 3 characters"],
      max: [20, "Name must be at most 20 characters"],
    },
  },
  { timestamps: true }
);

export const Type = model("Type", schema);
