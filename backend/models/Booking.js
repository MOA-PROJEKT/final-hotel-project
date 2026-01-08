import { Schema, model } from 'mongoose'

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    roomId: { type: String, required: true }, // erstmal string (z.B. "room-1")

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    guests: { type: Number, required: true, min: 1, max: 10 },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default model('Booking', bookingSchema)
