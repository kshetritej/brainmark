import exp from "constants";
import { model, Schema } from "mongoose";

const schema = new Schema({
  token: String,
  contentId: String,
  expire: Date,
  shareableLink: String,
});

export const Share = model("Share", schema);
