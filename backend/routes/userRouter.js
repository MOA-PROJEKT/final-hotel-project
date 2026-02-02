// backend/routes/userRouter.js
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

import { updateEmail, deleteMe } from "../controllers/authController.js";
import { updateEmailSchema } from "../schemas/auth.schema.js";
import { validateRequest } from "../middleware/validateRequest.js";

const userRouter = Router();


userRouter.patch(
  "/me/email",
  protect,
  updateEmailSchema,
  validateRequest,
  updateEmail
);


userRouter.delete("/me", protect, deleteMe);

export default userRouter;
