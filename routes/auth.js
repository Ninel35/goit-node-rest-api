import express from "express";

import register from "../controllers/auth.js";
import validateBody from "../helpers/validateBody.js";

const router = express.Router();
// const jsonParser = express.json();
import { registerSchema } from "../schemas/contactsSchemas.js";

// import isValidId from "../helpers/isvalidId.js";

router.post("/register", validateBody(registerSchema), register);

export default router;
