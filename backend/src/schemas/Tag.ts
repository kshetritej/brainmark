import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [3, "Name must be at least 3 characters"],
    },
  },
  { timestamps: true }
);

export const Tag = model("Tag", schema);
