import { Router } from 'express'
import * as booking from '../controllers/bookingController.js'
import { protect, restrictTo } from '../middleware/authMiddleware.js'

import { createBookingSchema } from '../schemas/booking.schema.js'
import { validateRequest } from '../middleware/validateRequest.js'

const bookingRouter = Router()

// User
bookingRouter.post('/', protect, createBookingSchema, validateRequest, booking.createBooking)
bookingRouter.get('/me', protect, booking.getMyBookings)
bookingRouter.patch('/:id/cancel', protect, booking.cancelMyBooking)

// Admin
bookingRouter.get('/', protect, restrictTo('admin'), booking.getAllBookings)
bookingRouter.patch('/:id/status', protect, restrictTo('admin'), booking.updateBookingStatus)
bookingRouter.delete('/:id', protect, restrictTo('admin'), booking.deleteBooking)

export default bookingRouter
