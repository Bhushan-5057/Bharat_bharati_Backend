import { body } from "express-validator";

// Create Integartion Validation
export const createIntegrationValidation = [
    body("title")
        .notEmpty().withMessage("integration title required")
        .isString().withMessage("Title must be a string")
        .trim(),

    body("description")
        .notEmpty().withMessage("Integration description is required")
        .isString().withMessage("Description must be a string")
        .trim(),
];

// Update Integration Validation
export const updateIntegrationValidation = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string"),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
];