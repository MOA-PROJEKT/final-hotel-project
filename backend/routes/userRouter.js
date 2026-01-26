// backend/routes/userRouter.js
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateEmail, deleteMe } from "../controllers/userController.js";

const userRouter = Router();

// Eingeloggt nötig
userRouter.patch("/me/email", protect, updateEmail);
userRouter.delete("/me", protect, deleteMe);

export default userRouter;
