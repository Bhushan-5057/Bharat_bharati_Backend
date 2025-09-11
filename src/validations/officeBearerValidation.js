import { body } from "express-validator";

// Create OfficeBearer Validation
export const createOfficeBearerValidation = [
    body("title")
        .notEmpty().withMessage("Office bearer title required")
        .isString().withMessage("Title must be a string"),

    body("designation")
        .notEmpty().withMessage("Office bearer designation required")
        .isString().withMessage("Designation must be a string"),
    
    body("quotes")
        .optional()
        .isString().withMessage("Quotes must be a string"),

    body("twitter")
        .optional()
        .isURL().withMessage("Twitter must be a valid URL"),

    body("facebook")
        .optional()
        .isURL().withMessage("Facebook must be a valid URL"),

    body("gmail")
        .optional()
        .isEmail().withMessage("Gmail must be a valid email"),
];

// Update OfficeBearer Validation
export const updateOfficeBearerValidation = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string"),

    body("designation")
        .optional()
        .isString().withMessage("Designation must be a string"), 
    
    body("quotes")
        .optional()
        .isString().withMessage("Quotes must be a string"),

    body("twitter")
        .optional()
        .isURL().withMessage("Twitter must be a valid URL"),

    body("facebook")
        .optional()
        .isURL().withMessage("Facebook must be a valid URL"),

    body("gmail")
        .optional()
        .isEmail().withMessage("Gmail must be a valid email"),
];
