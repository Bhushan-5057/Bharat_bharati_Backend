import { body, oneOf } from 'express-validator'

// Login User Validation
export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
]

// create user validation
export const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

//update User validation
export const updateUserValidation = [
  // At least one of the fields must be present
  oneOf([
    body('name').exists().notEmpty(),
    body('email').exists().notEmpty(),
    body('password').exists().notEmpty()
  ], 'At least one of name, email, or password is required'),
];