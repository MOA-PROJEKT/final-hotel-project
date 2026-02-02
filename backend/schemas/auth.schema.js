import { body } from 'express-validator'

export const registerSchema = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required.')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must be 2-60 chars.'),

  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.')
    .isString()
    .withMessage('Password must be a string.')
    .isLength({ min: 6, max: 72 })
    .withMessage('Password must be 6-72 chars.'),
]

export const loginSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.')
    .isString()
    .withMessage('Password must be a string.'),
]


export const updatePasswordSchema = [
  body('currentPassword')
    .exists({ checkFalsy: true })
    .withMessage('Current password is required.')
    .isString()
    .withMessage('Current password must be a string.'),

  body('newPassword')
    .exists({ checkFalsy: true })
    .withMessage('New password is required.')
    .isString()
    .withMessage('New password must be a string.')
    .isLength({ min: 6, max: 72 })
    .withMessage('New password must be 6-72 chars.'),

  body('confirmNewPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirm new password is required.')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Passwords do not match.'),
]

export const updateEmailSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),
]