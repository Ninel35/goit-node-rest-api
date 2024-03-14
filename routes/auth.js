import express from "express";

import { register, login, logout, getUser } from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";

const router = express.Router();

import { loginSchema, registerSchema } from "../schemas/contactsSchemas.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/logout", authenticate, logout);
router.get("/current", authenticate, getUser);

export default router;
