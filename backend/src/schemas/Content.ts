import {Schema, model} from "mongoose";
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: [3, "Title must be at least 3 characters"],
      max: [20, "Title must be at most 20 characters"],
    },
    content: {
      type: String,
      required: true,
      min: [3, "Content must be at least 3 characters"],
      max: [20, "Content must be at most 20 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
  },
  { timestamps: true }
);

export const Content = model("Content", schema);
