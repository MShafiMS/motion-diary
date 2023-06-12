import express from "express";
import blogController from "./blog.controller.js";

const router = express.Router();

router.get("/", blogController.getBlogs);
router.post("/post-blog", blogController.postBlog);
router.put("/approve-blog", blogController.approveBlog);
router.put("/edit-blog", blogController.editBlog);
router.put("/blog-likes", blogController.blogLike);
router.put("/blog-comments", blogController.blogComment);
router.put("/blog-favorite", blogController.blogFavorite);
router.get("/:id", blogController.getBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;
