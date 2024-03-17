import express from "express";

import {
  register,
  login,
  logout,
  getUser,
  verification,
  verifyAgain,
} from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";

const router = express.Router();

import {
  emailSchema,
  loginSchema,
  registerSchema,
} from "../schemas/contactsSchemas.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/logout", authenticate, logout);
router.get("/current", authenticate, getUser);
router.get("/verify/:verificationToken", verification);
router.post("/verify", validateBody(emailSchema), verifyAgain);

export default router;
