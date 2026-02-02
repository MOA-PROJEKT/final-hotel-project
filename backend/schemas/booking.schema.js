import { body, param } from 'express-validator'

export const createBookingSchema = [
  body('roomId')
    .exists({ checkFalsy: true })
    .withMessage('roomId is required.')
    .isString()
    .withMessage('roomId must be a string.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('roomId length is invalid.'),

  body('checkIn')
    .exists({ checkFalsy: true })
    .withMessage('checkIn is required.')
    .isISO8601()
    .withMessage('checkIn must be a valid date.')
    .toDate()
    .custom((value) => {
      const year = value.getUTCFullYear()
      return year >= 2000 && year <= 2100
    })
    .withMessage('checkIn year must be between 2000 and 2100.'),

  body('checkOut')
    .exists({ checkFalsy: true })
    .withMessage('checkOut is required.')
    .isISO8601()
    .withMessage('checkOut must be a valid date.')
    .toDate()
    .custom((value, { req }) => {
      const checkIn = req.body.checkIn
      if (!(checkIn instanceof Date) || isNaN(checkIn.getTime())) return false
      return value > checkIn
    })
    .withMessage('checkOut must be after checkIn.'),

  body('guests')
    .exists({ checkFalsy: true })
    .withMessage('guests is required.')
    .isInt({ min: 1, max: 10 })
    .withMessage('guests must be between 1 and 10.')
    .toInt(),
]


export const bookingIdParamSchema = [
  param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
]

export const bookingStatusPatchSchema = [
  param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
  body('status')
    .trim()
    .isIn(['pending', 'confirmed', 'cancelled'])
    .withMessage('status must be one of: pending, confirmed, cancelled'),
]
