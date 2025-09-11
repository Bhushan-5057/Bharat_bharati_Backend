import { body } from "express-validator";

// Validation rules
export const validateVideoBody = [

    body("description")
        .optional()
        .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

    body("youtube_url")
        .notEmpty().withMessage("YouTube URL is required")
        .isURL().withMessage("YouTube URL must be valid")
        .matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//)
        .withMessage("Must be a valid YouTube link"),
];
