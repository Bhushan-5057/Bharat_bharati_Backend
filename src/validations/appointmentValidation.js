import { body } from "express-validator";

export const appointmentValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .trim(),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),

    body("contact_number")
        .notEmpty().withMessage("Contact number is required")
        .isLength({ min: 10 }).withMessage("Contact number should be 10 characters")
        .matches(/^[0-9]+$/).withMessage("Contact number must contain only digits"),

    body("date")
        .notEmpty().withMessage("Date is required")
        .isDate().withMessage("Must be a valid date"),

    body("time")
        .notEmpty().withMessage("Time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM format"),

    body("reason_of_meeting")
        .notEmpty().withMessage("Reason of meeting is required")
        .trim(),

    body("your_expectation")
        .optional().trim(),

    body("more_details")
        .optional().trim()

];

export const appointmentUpdateValidation = [
    body("name")
        .optional()
        .trim(),

    body("email")
        .optional()
        .isEmail().withMessage("Must be a valid email"),

    body("contact_number")
        .optional()
        .isLength({ min: 10 }).withMessage("Contact number should be 10 characters")
        .matches(/^[0-9]+$/).withMessage("Contact number must contain only digits"),

    body("date")
        .optional()
        .isDate().withMessage("Must be a valid date"),

    body("time")
        .optional()
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

