import { check } from "express-validator";

const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
];

// Create Image Validation
export const GalleryImageValidation = [
    check("file_name").custom((value, { req }) => {
        if (!req.file && (!req.files || req.files.length === 0)) {
            throw new Error("File is required");
        }

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (!allowedMimes.includes(file.mimetype)) {
                    throw new Error(`Invalid file type: ${file.mimetype}. Only image files are allowed`);
                }
            }
        }

        if (req.file && !allowedMimes.includes(req.file.mimetype)) {
            throw new Error(`Invalid file type: ${req.file.mimetype}. Only image files are allowed`);
        }

        return true;
    }),
];

// Update Image Validation
export const updateGalleryImageValidation = [
    check("file_name").custom((value, { req }) => {
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (!allowedMimes.includes(file.mimetype)) {
                    throw new Error(`Invalid file type: ${file.mimetype}. Only image files are allowed`);
                }
            }
        }

        if (req.file && !allowedMimes.includes(req.file.mimetype)) {
            throw new Error(`Invalid file type: ${req.file.mimetype}. Only image files are allowed`);
        }

        return true;
    }),
];