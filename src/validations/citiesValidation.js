import { body } from "express-validator";

// Create City Validation
export const createCityValidation = [
    body("title")
        .notEmpty().withMessage("Cities title required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("description")
        .notEmpty().withMessage("Cities description is required")
        .isString().withMessage("Description must be a string")
        .trim(),
];

// Update City Validation
export const updateCityValidation = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
];