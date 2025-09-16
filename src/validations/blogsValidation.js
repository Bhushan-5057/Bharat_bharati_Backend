import { body, check } from "express-validator";

const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
];

// Create Blog Validation
export const createBlogValidation = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("slug")
        .notEmpty().withMessage("Slug is required")
        .isSlug().withMessage("Slug must be URL-friendly")
        .trim(),

    body("meta_title")
        .notEmpty().withMessage("Meta title is required")
        .isString().withMessage("Meta title must be a string")
        .trim(),

    body("meta_description")
        .notEmpty().withMessage("Meta description is required")
        .isString().withMessage("Meta description must be a string")
        .trim(),

    body("content")
        .notEmpty().withMessage("Content is required")
        .isString().withMessage("Content must be a string"),

    body("tags")
        .notEmpty().withMessage("Tags are required")
        .isString().withMessage("Tags must be a string"),

    body("category")
        .notEmpty().withMessage("Category is required")
        .isString().withMessage("Category must be a string"),

    check("file_name").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image file is required");
        }

        if (!allowedMimes.includes(req.file.mimetype)) {
            throw new Error("Invalid file type. Only jpg, jpeg, png, gif, webp allowed");
        }
        return true;
    }),
];

// Update Blog Validation
export const updateBlogValidation = [
    body("title")
        .optional()
        .notEmpty().withMessage("Title cannot be empty")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("slug")
        .optional()
        .notEmpty().withMessage("Slug cannot be empty")
        .isSlug().withMessage("Slug must be URL-friendly")
        .trim(),

    body("meta_title")
        .optional()
        .notEmpty().withMessage("Meta title cannot be empty")
        .isString().withMessage("Meta title must be a string")
        .trim(),

    body("meta_description")
        .optional()
        .notEmpty().withMessage("Meta description cannot be empty")
        .isString().withMessage("Meta description must be a string")
        .trim(),

    body("content")
        .optional()
        .notEmpty().withMessage("Content cannot be empty")
        .isString().withMessage("Content must be a string"),

    body("tags")
        .optional()
        .notEmpty().withMessage("Tags cannot be empty")
        .isString().withMessage("Tags must be a string"),

    body("category")
        .optional()
        .notEmpty().withMessage("Category cannot be empty")
        .isString().withMessage("Category must be a string"),

    check("file_name").custom((value, { req }) => {
        if (req.file) {
            if (!allowedMimes.includes(req.file.mimetype)) {
                throw new Error("Invalid file type. Only jpg, jpeg, png, gif, webp allowed");
            }
        }
        return true;
    }),
];