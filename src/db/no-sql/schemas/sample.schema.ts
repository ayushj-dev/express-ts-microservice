import { Schema } from "mongoose";

export const SampleSchema = new Schema({
  sample_text: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
