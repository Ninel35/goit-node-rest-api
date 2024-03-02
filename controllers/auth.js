import HttpError from "../helpers/HttpError.js";

import User from "../models/user.js";

export const register = async (req, res, next) => {
  try {
    // const newUser = await User.create(req.body);
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      next(HttpError(409));
      return;
    }
    const result = await User.create(req.body);
    res.status(201).send(result);
    // res.status(201).json({
    //   email: newUser.email,
    //   name: newUser.name,
    // });
  } catch (error) {
    next(error);
  }
};

export default register;
