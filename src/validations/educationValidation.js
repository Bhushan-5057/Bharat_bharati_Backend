import { body } from "express-validator";

export const createEducationValidation = [
    body("type")
        .isIn(["education", "school"])
        .withMessage("Type must be either 'education' or 'school'"),
    
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string"),
    
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string"),
    
    body("school_address")
        .if((value, { req }) => req.body.type === "school")
        .notEmpty()
        .withMessage("School address is required.")
        .isString()
        .withMessage("School address must be a string"),
    
];

export const updateEducationValidation = [
    body("type")
        .optional()
        .isIn(["education", "school"])
        .withMessage("Type must be either 'education' or 'school'"),
    
    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
    
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    
    body("school_address")
        .optional()
        .if((value, { req }) => req.body.type === "school")
        .notEmpty()
        .withMessage("School address is required.")
        .isString()
        .withMessage("School address must be a string"),
];