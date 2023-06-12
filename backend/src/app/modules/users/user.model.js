import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  photoUrl: String,
  role: String,
});

export const User = model("User", userSchema);
