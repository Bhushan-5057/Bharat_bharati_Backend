import { User, Blog } from "../models/index.js";

// Create Blog
export const createBlog = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const blog = await Blog.create({
            title: req.body.title,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            content: req.body.content,
            file_name: req.file.originalname,
            data: req.file.buffer,
            tags: req.body.tags,
            category: req.body.category,
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

        const updateData = { ...req.body };
        if (req.file) {
            updateData.file_name = req.file.originalname;
            updateData.data = req.file.buffer;
        }

        await blog.update(updateData);

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