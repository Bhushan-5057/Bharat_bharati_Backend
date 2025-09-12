import { body, check } from "express-validator"; 

const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
];

export const createDonationPageValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .trim(),
    
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .trim(), 
    
    check("file_name")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("File is required");
            }

            if (!allowedMimes.includes(req.file.mimetype)) {
                throw new Error("Invalid file type. Only jpg, jpeg, png, gif, webp allowed");
            }
            return true;
        }),
    
    body("sub_title").
        notEmpty()
        .withMessage("Sub title is required"),
    
    body("account_holder_name")
        .notEmpty()
        .withMessage("Account holder name is required")
        .isString()
        .withMessage("Account holder name must be a string")
        .trim(),
    
    body("account_number")
        .isNumeric()
        .withMessage("Account number must be numeric")
        .notEmpty()
        .withMessage("Account number is required"),
    
    body("bank_name")
        .notEmpty()
        .withMessage("Bank name is required")
        .isString()
        .withMessage("Bank name must be a string")
        .trim(),
    
    body("ifsc_code")
        .notEmpty()
        .withMessage("IFSC code is required")
        .isString()
        .withMessage("IFSC code must be a string")
        .trim(),
]; 

export const updateDonationPageValidation = [
    body("title")
        .optional()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isString()
        .withMessage("Title must be a string")
        .trim(),
    
    body("description")
        .optional()
        .notEmpty()
        .withMessage("Description cannot be empty")
        .isString()
        .withMessage("Description must be a string")
        .trim(), 
    
    check("file_name")
        .custom((value, { req }) => {
            if (req.file) {
                if (!allowedMimes.includes(req.file.mimetype)) {
                    throw new Error("Invalid file type. Only jpg, jpeg, png, gif, webp allowed");
                }
            }
            return true;
        }),
    
    body("sub_title")
        .optional()
        .notEmpty()
        .withMessage("Sub title cannot be empty")
        .isString()
        .withMessage("Sub title must be a string")
        .trim(),
    
    body("account_holder_name")
        .optional()
        .notEmpty()
        .withMessage("Account holder name cannot be empty")
        .isString()
        .withMessage("Account holder name must be a string")
        .trim(),
    
    body("account_number")
        .optional()
        .isNumeric()
        .withMessage("Account number must be numeric")
        .notEmpty()
        .withMessage("Account number cannot be empty"),
    
    body("bank_name")
        .optional()
        .notEmpty()
        .withMessage("Bank name cannot be empty")
        .isString()
        .withMessage("Bank name must be a string")
        .trim(),
    
    body("ifsc_code")
        .optional()
        .notEmpty()
        .withMessage("IFSC code cannot be empty")
        .isString()
        .withMessage("IFSC code must be a string")
        .trim(),
];
