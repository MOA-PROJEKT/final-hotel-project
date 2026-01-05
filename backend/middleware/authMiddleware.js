import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    // 1) Token aus Header holen
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Not logged in (missing token).' })
    }

    const token = auth.split(' ')[1]

    // 2) Token prüfen
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 3) User laden (muss existieren)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ msg: 'User no longer exists.' })
    }

    // 4) User an Request hängen
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid or expired token.' })
  }
}

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden (not enough rights).' })
    }
    next()
  }
}
