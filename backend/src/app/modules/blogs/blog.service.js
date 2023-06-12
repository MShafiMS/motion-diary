import { Blog } from "./blog.model.js";

const getBlogs = async () => {
  const blogs = await Blog.find();
  return blogs;
};

const postBlog = async (blogData) => {
  const postedBlog = new Blog(blogData);
  await postedBlog.save();
  return postedBlog;
};

const getBlog = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

const approveBlog = async (id, approve) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      approve: approve,
    },
  };
  const approvedBlog = await Blog.updateOne(filter, updateDoc, options);
  return approvedBlog;
};

const deleteBlog = async (id) => {
  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};

const editBlog = async (id, updateDoc) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const editedBlog = Blog.updateOne(filter, updateDoc, options);
  return editedBlog;
};

const blogLike = async (id, updateDoc) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const likedBlog = Blog.updateOne(filter, updateDoc, options);
  return likedBlog;
};
const blogComment = async (id, updateDoc) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const commentedBlog = Blog.updateOne(filter, updateDoc, options);
  return commentedBlog;
};
const blogFavorite = async (id, updateDoc) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const favoriteBlog = Blog.updateOne(filter, updateDoc, options);
  return favoriteBlog;
};

export default {
  getBlogs,
  postBlog,
  getBlog,
  approveBlog,
  deleteBlog,
  editBlog,
  blogLike,
  blogComment,
  blogFavorite,
};
