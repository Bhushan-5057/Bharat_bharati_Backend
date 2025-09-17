import { body,check } from "express-validator";

// Create Service Validation
export const createServiceValidation = [
    body("title")
        .notEmpty().withMessage("Service title required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("description")
        .notEmpty().withMessage("Service description is required")
        .isString().withMessage("Description must be a string")
        .trim(), 
    
    check("file_name").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("File is required");
        }
        const allowedMime = "image/svg+xml";

        if (req.file.mimetype !== allowedMime) {
            throw new Error("Only SVG files are allowed");
        }
        return true;
    }),
];

// Update Service Validation
export const updateServiceValidation = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string"), 
    
    check("file_name").custom((value, { req }) => {
        if (req.file) {
            const allowedMime = "image/svg+xml";
            if (req.file.mimetype !== allowedMime) {
                throw new Error("Only SVG files are allowed");
            }
        }
        return true;
    }),
];