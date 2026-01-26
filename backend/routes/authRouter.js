import { Router } from 'express'
import * as auth from '../controllers/authController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const authRouter = Router()

authRouter.post('/register', auth.register)
authRouter.post('/login', auth.login)
authRouter.get('/me', protect, auth.getMe)
authRouter.patch('/update-password', protect, auth.updatePassword)

authRouter.patch('/update-email', protect, auth.updateEmail)
authRouter.delete('/delete-me', protect, auth.deleteMe)


authRouter.get('/admin-test', protect, restrictTo('admin'), (req, res) => {
  res.json({ msg: 'admin access ok' })
})

export default authRouter
