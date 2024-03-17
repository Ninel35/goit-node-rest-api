import express from "express";
const uploadRouter = express.Router();
import upload from "../middleware/upload.js";
import { uploadAvatars } from "../controllers/users.js";

uploadRouter.patch("/avatars", upload.single("avatar"), uploadAvatars);

export default uploadRouter;
