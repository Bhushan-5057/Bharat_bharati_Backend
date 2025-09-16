import express from "express";
import upload from "../utils/upload.js";
import { authenticateToken } from "../middleware/authorization.js";
import { createBlogValidation, updateBlogValidation } from '../validations/blogsValidation.js';
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from "../controllers/blogsController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/create", authenticateToken, upload.single("file_name"), createBlogValidation, validateRequest, createBlog);
router.get("/get-all", getAllBlogs);
router.get("/get/:slug", getBlogBySlug);
router.put("/update/:id", authenticateToken, upload.single("file_name"), updateBlogValidation, validateRequest, updateBlog);
router.delete("/delete/:id", authenticateToken, deleteBlog);

export default router;
