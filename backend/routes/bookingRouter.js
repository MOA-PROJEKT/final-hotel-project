import { Router } from 'express'
import * as booking from '../controllers/bookingController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

const bookingRouter = Router()

// User
bookingRouter.post('/', protect, booking.createBooking)
bookingRouter.get('/me', protect, booking.getMyBookings)

// Admin
bookingRouter.get('/', protect, restrictTo('admin'), booking.getAllBookings)
bookingRouter.patch('/:id/status', protect, restrictTo('admin'), booking.updateBookingStatus)
bookingRouter.delete('/:id', protect, restrictTo('admin'), booking.deleteBooking)


export default bookingRouter
