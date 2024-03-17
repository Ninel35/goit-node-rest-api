import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    next(HttpError(401));
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const user = await User.findById(decode.id);

    if (user === null) {
      return res.status(401).send({ message: "Invalid token" });
    }

    if (user.token !== token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    if (user.verify === false) {
      return res.status(401).send({ message: "Your account is not verified" });
    }

    req.user = {
      id: decode.id,
      email: decode.email,
      subscription: user.subscription,
    };

    next();
  });
};
