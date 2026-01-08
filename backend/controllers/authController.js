import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
})

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Backend-Validierung (Pflicht!)
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ msg: 'Name is required (min 2 chars).' })
    }
    if (!email || !isEmail(email)) {
      return res.status(400).json({ msg: 'Valid email is required.' })
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Password is required (min 6 chars).' })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Email schon vergeben?
    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(409).json({ msg: 'Email already in use.' })
    }

    const cost = Number(process.env.BCRYPT_COST || 12)
    const passwordHash = await bcrypt.hash(password, cost)

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'user',
    })

    const token = signToken(user._id)

    return res.status(201).json({
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Server error!' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !isEmail(email)) {
      return res.status(400).json({ msg: 'Valid email is required.' })
    }
    if (!password) {
      return res.status(400).json({ msg: 'Password is required.' })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // passwordHash ist select:false -> darum select('+passwordHash')
    const user = await User.findOne({ email: normalizedEmail }).select(
      '+passwordHash'
    )

    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials.' })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return res.status(401).json({ msg: 'Invalid credentials.' })
    }

    const token = signToken(user._id)

    return res.status(200).json({
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Server error!' })
  }
}

// optional aber super zum Testen:
export const getMe = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) })
}


export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ msg: 'currentPassword and newPassword required.' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'newPassword must be at least 6 chars.' })
    }

    // passwordHash ist select:false -> explizit holen
    const user = await User.findById(req.user._id).select('+passwordHash')
    if (!user) return res.status(404).json({ msg: 'User not found.' })

    const ok = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!ok) return res.status(401).json({ msg: 'Current password is wrong.' })

    const cost = Number(process.env.BCRYPT_COST || 12)
    user.passwordHash = await bcrypt.hash(newPassword, cost)
    await user.save()

    return res.json({ msg: 'Password updated.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Server error!' })
  }
}
