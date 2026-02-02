import { Router } from 'express'
import * as auth from '../controllers/authController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

import {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
  updateEmailSchema,
} from '../schemas/auth.schema.js'

import { validateRequest } from '../middleware/validateRequest.js'

const authRouter = Router()

authRouter.post('/register', registerSchema, validateRequest, auth.register)
authRouter.post('/login', loginSchema, validateRequest, auth.login)
authRouter.get('/me', protect, auth.getMe)
authRouter.patch(
  '/update-password',
  protect,
  updatePasswordSchema,
  validateRequest,
  auth.updatePassword
)

authRouter.patch(
  '/update-email',
  protect,
  updateEmailSchema,
  validateRequest,
  auth.updateEmail
)

authRouter.delete('/delete-me', protect, auth.deleteMe)


authRouter.get('/admin-test', protect, restrictTo('admin'), (req, res) => {
  res.json({ msg: 'admin access ok' })
})

export default authRouter
