import { User, Blog } from "../models/index.js";
import { Op } from "sequelize";

// Create Blog
export const createBlog = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const { title, slug, meta_title, meta_description, content, tags, category } = req.body;

        const existingBlog = await Blog.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { slug }
                ]
            }
        });

        if (existingBlog) {
            return res.status(409).json({ success: false, message: "Blog with this title or slug already exists" });
        }

        const existingFile = await Blog.findOne({
            where: { file_name: req.file.originalname }
        });

        if (existingFile) {
            return res.status(409).json({ success: false, message: "Blog with this file already exists" });
        }

        const blog = await Blog.create({
            title,
            slug,
            meta_title,
            meta_description,
            content,
            file_name: req.file.originalname,
            data: req.file.buffer,
            tags,
            category,
            created_by: req.user.id,
        });

        res.status(201).json({ success: true, message: "Blog created successfully", blog });
    } catch (error) {
        next(error);
    }
};

// Get All Blogs
export const getAllBlogs = async (req, res, next) => {
    try { 

        const where = {};
        if (req.query.category) {
            where.category = req.query.category;
            where.tags = req.query.tags;
        }
        const blogs = await Blog.findAll({
            where,
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] ,}
            ],
            order: [["createdAt", "DESC"]],
        });

        const formatted = blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            meta_title: blog.meta_title,
            meta_description: blog.meta_description,
            content: blog.content,
            tags: blog.tags,
            category: blog.category,
            created_by: blog.created_by,
            creator: blog.creator,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            file_name: blog.file_name,
            data: blog.data.toString("base64"),
        }));

        res.json(formatted);
    } catch (error) {
        next(error);
    }
};

// Get Blog by Slug
export const getBlogBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const blog = await Blog.findOne({
            where: { slug },
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ],
        });

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.json({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            meta_title: blog.meta_title,
            meta_description: blog.meta_description,
            content: blog.content,
            tags: blog.tags,
            category: blog.category,
            created_by: blog.created_by,
            creator: blog.creator,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            file_name: blog.file_name,
            data: blog.data.toString("base64"),
        });
    } catch (error) {
        next(error);
    }
};

// Update Blog
export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const updates = { ...req.body };
        const uniqueFields = ["title", "slug"];

        for (const field of uniqueFields) {
            if (updates[field]) {
                const existing = await Blog.findOne({
                    where: {
                        [field]: updates[field],
                        id: { [Op.ne]: blog.id }
                    }
                });
                if (existing) {
                    return res
                        .status(409)
                        .json({ success: false, message: `Another blog with this ${field} already exists` });
                }
                blog[field] = updates[field];
            }
        }

        if (req.file) {
            const duplicateFile = await Blog.findOne({
                where: {
                    id: { [Op.ne]: blog.id },
                    file_name: req.file.originalname
                }
            });

            if (duplicateFile) {
                return res.status(409).json({
                    success: false,
                    message: "Another blog with this file already exists. Please upload a different file."
                });
            }

            blog.file_name = req.file.originalname;
            blog.data = req.file.buffer;
        }

        Object.assign(blog, updates);

        await blog.save();

        res.json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        next(error);
    }
};

// Delete Blog
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        await blog.destroy();

        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
};