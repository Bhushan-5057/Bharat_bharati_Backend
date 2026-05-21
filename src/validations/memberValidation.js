import { body } from "express-validator";
import { MEMBER_CATEGORIES } from "../models/Member.model.js";

const allowedCategories = Object.values(MEMBER_CATEGORIES);
const textOnlyRegex = /^[A-Za-z\s.'()\-]+$/;

// Create Member Validation
export const createMemberValidation = [
    body("category")
        .notEmpty().withMessage("Member category is required")
        .isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),

    body("name")
        .notEmpty().withMessage("Member name is required")
        .isString().withMessage("Member name must be a string")
        .matches(textOnlyRegex).withMessage("Member name cannot contain numbers")
        .trim(),

    body("designation")
        .custom((value, { req }) => {
            if (req.body.category === MEMBER_CATEGORIES.NATIONAL_CORE_COMMITTEE && !value) {
                throw new Error("Designation is required for national core commitee members");
            }

            if (req.body.category === MEMBER_CATEGORIES.NATIONAL_EXECUTIVE_COUNCIL && value) {
                throw new Error("Designation is not allowed for national excutive council members");
            }

            if (value && !textOnlyRegex.test(value)) {
                throw new Error("Designation cannot contain numbers");
            }

            return true;
        })
        .trim(),
];

// Update Member Validation
export const updateMemberValidation = [
    body("category")
        .optional()
        .isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),

    body("name")
        .optional()
        .notEmpty().withMessage("Member name cannot be empty")
        .isString().withMessage("Member name must be a string")
        .matches(textOnlyRegex).withMessage("Member name cannot contain numbers")
        .trim(),

    body("designation")
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (req.body.category === MEMBER_CATEGORIES.NATIONAL_CORE_COMMITTEE && !value) {
                throw new Error("Designation is required for national core commitee members");
            }

            if (req.body.category === MEMBER_CATEGORIES.NATIONAL_EXECUTIVE_COUNCIL && value) {
                throw new Error("Designation is not allowed for national excutive council members");
            }

            if (value && !textOnlyRegex.test(value)) {
                throw new Error("Designation cannot contain numbers");
            }

            return true;
        })
        .trim(),
];
