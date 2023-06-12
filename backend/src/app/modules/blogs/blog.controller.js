import blogService from "./blog.service.js";

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.status(200).json({
      success: true,
      message: "Blogs loaded successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to load Blogs!! Error:${error}`,
    });
  }
};

const postBlog = async (req, res) => {
  try {
    const {
      title,
      img,
      category,
      description,
      date,
      blog,
      author,
      email,
      like,
      comment,
    } = req.body;
    const blogData = {
      title: title,
      img: img,
      category: category,
      description: description,
      blog: blog,
      author: author,
      email: email,
      date: date,
      like: like,
      comment: comment,
    };
    const blogs = await blogService.postBlog(blogData);
    res.status(200).json({
      success: true,
      message: "Blog posted successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to post Blog!! Error:${error}`,
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blogService.getBlog(id);
    res.status(200).json({
      success: true,
      message: "Blog loaded successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to load Blog!! Error:${error}`,
    });
  }
};

const approveBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const { approve } = req.body;
    const blogs = await blogService.approveBlog(id, approve);
    res.status(200).json({
      success: true,
      message: "Blog approved successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to approve Blog!! Error:${error}`,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blogService.deleteBlog(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to delete Blog!! Error:${error}`,
    });
  }
};
const editBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, img, category, description, updated, blog } = req.body;
    const updateDoc = {
      $set: {
        title: title,
        img: img,
        category: category,
        description: description,
        blog: blog,
        updated: updated,
      },
    };
    const blogs = await blogService.editBlog(id, updateDoc);
    res.status(200).json({
      success: true,
      message: "Blog edited successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to edit Blog!! Error:${error}`,
    });
  }
};

const blogLike = async (req, res) => {
  try {
    const { id } = req.query;
    const { like } = req.body;
    const updateDoc = {
      $set: {
        like: like,
      },
    };
    const blogs = await blogService.blogLike(id, updateDoc);
    res.status(200).json({
      success: true,
      message: "Blog liked successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to like Blog!! Error:${error}`,
    });
  }
};
const blogComment = async (req, res) => {
  try {
    const { id } = req.query;
    const { comment } = req.body;
    const updateDoc = {
      $set: {
        comment: comment,
      },
    };
    const blogs = await blogService.blogComment(id, updateDoc);
    res.status(200).json({
      success: true,
      message: "Blog commented successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to comment Blog!! Error:${error}`,
    });
  }
};
const blogFavorite = async (req, res) => {
  try {
    const { id } = req.query;
    const { favorite } = req.body;
    const updateDoc = {
      $set: {
        favorite: favorite,
      },
    };
    const blogs = await blogService.blogFavorite(id, updateDoc);
    res.status(200).json({
      success: true,
      message: "Blog favorited successfully!!",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to favorite Blog!! Error:${error}`,
    });
  }
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
