import Booking from '../models/Booking.js'

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body
    if (!roomId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ msg: 'roomId, checkIn, checkOut, guests required.' })
    }

    const booking = await Booking.create({
      user: req.user._id,
      roomId,
      checkIn,
      checkOut,
      guests,
    })

    res.status(201).json({ booking })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error!' })
  }
}

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
  .populate('user', 'name email')
  .sort({ createdAt: -1 })

  res.json({ bookings })
}

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
  .populate('user', 'name email role')
  .sort({ createdAt: -1 })

  res.json({ bookings })
}

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status.' })
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email role')

    if (!booking) return res.status(404).json({ msg: 'Booking not found.' })

    res.json({ booking })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error!' })
  }
}

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) return res.status(404).json({ msg: 'Booking not found.' })
    res.json({ msg: 'Booking deleted.' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error!' })
  }
}

