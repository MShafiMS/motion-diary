import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  img: String,
  category: String,
  description: String,
  blog: String,
  author: {},
  email: String,
  date: String,
  like: [],
  comment: [],
  favorite: [],
  approve: String,
  updated: String,
});

export const Blog = model("Blog", blogSchema);
