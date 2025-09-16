import { body } from "express-validator";

export const appointmentValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),

    body("contact_number")
        .trim()
        .notEmpty().withMessage("Contact number is required")
        .isLength({ min: 10 }).withMessage("Contact number should be 10 characters")
        .matches(/^[0-9]+$/).withMessage("Contact number must contain only digits"),

    body("date")
        .trim()
        .notEmpty().withMessage("Date is required")
        .isDate().withMessage("Must be a valid date"),

    body("time")
        .trim()
        .notEmpty().withMessage("Time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM format"),

    body("reason_of_meeting")
        .trim()
        .notEmpty().withMessage("Reason of meeting is required"),

    body("your_expectation")
        .optional().trim(),

    body("more_details")
        .optional().trim()

];

export const appointmentUpdateValidation = [
    body("name")
        .optional()
        .trim()
        .notEmpty().withMessage("Name cannot be empty if provided"),

    body("email")
        .optional()
        .trim()
        .isEmail().withMessage("Must be a valid email"),

    body("contact_number")
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage("Contact number should be 10 characters")
        .matches(/^[0-9]+$/).withMessage("Contact number must contain only digits"),

    body("date")
        .optional()
        .trim()
        .isDate().withMessage("Must be a valid date"),

    body("time")
        .optional()
        .trim()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM format"),

    body("reason_of_meeting")
        .optional()
        .trim(),

    body("your_expectation")
        .optional()
        .trim(),

    body("more_details")
        .optional()
        .trim()
];

