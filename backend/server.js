import 'dotenv/config'

import express from 'express'
import connectDB from './libs/dbConnect.js'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js' // ✅ neu
import bookingRouter from './routes/bookingRouter.js'

connectDB()

const PORT = process.env.PORT || 3000;


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter) // ✅ neu
app.use('/users', userRouter)
app.use('/bookings', bookingRouter)

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})


