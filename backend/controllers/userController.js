// backend/controllers/userController.js
import bcrypt from "bcrypt";
import User from "../models/User.js";

// PATCH /users/me/email  { email, password }
export const updateEmail = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Bitte E-Mail und Passwort senden." });
    }

    // User mit passwordHash holen (weil select:false im Model)
    const user = await User.findById(userId).select("+passwordHash");
    if (!user) return res.status(404).json({ msg: "User nicht gefunden." });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ msg: "Passwort ist falsch." });

    // check: email schon vergeben?
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists && String(exists._id) !== String(user._id)) {
      return res.status(409).json({ msg: "Diese E-Mail ist schon vergeben." });
    }

    user.email = email.toLowerCase().trim();
    await user.save();

    // ohne passwordHash zurückgeben
    return res.json({
      msg: "E-Mail aktualisiert.",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    return res.status(500).json({ msg: "Serverfehler beim E-Mail ändern." });
  }
};

// DELETE /users/me  { password }
export const deleteMe = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ msg: "Bitte Passwort senden." });
    }

    const user = await User.findById(userId).select("+passwordHash");
    if (!user) return res.status(404).json({ msg: "User nicht gefunden." });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ msg: "Passwort ist falsch." });

    await User.findByIdAndDelete(userId);

    return res.json({ msg: "Account gelöscht." });
  } catch (e) {
    return res.status(500).json({ msg: "Serverfehler beim Löschen." });
  }
};
