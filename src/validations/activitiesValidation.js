import { body } from "express-validator";

// Create Activities Validation
export const createActivitiesValidation = [
    body("title")
        .notEmpty().withMessage("Activities title required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("description")
        .notEmpty().withMessage("Activities description is required")
        .isString().withMessage("Description must be a string")
        .trim(),
];

// Update Activities Validation
export const updateActivitiesValidation = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
];
