import * as fs from "node:fs/promises";
import * as path from "node:path";
import Jimp from "jimp";

import User from "../models/user.js";

export const uploadAvatars = async (req, res, next) => {
  try {
    const img = await Jimp.read(req.file.path);
    await img.resize(250, 250).writeAsync(path.join(req.file.path));

    await fs.rename(
      req.file.path,
      path.join(process.cwd(), "public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};
