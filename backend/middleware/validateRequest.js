import { validationResult } from 'express-validator'

export const validateRequest = (req, res, next) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: result.array().map((e) => ({
        field: e.path,
        msg: e.msg,
      })),
    })
  }

  next()
}
