import crypto from "node:crypto";
import bycrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      next(HttpError(409));
      return;
    }
    const passwordHash = await bycrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = crypto.randomUUID();

    //send email
    await transport.sendMail({
      to: email,
      from: process.env.MY_EMAIL,
      subject: "Welcome to Contacts",
      html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    const result = await User.create({
      verificationToken,
      email: normalizedEmail,
      password: passwordHash,
      avatarURL,
    });
    res.status(201).send({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw HttpError(401, "Wrong email or password");
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw HttpError(401, "Wrong email or password");
    }

    if (user.verify === false) {
      throw HttpError(401, "Your account is not verified");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "23h" }
    );

    await User.findByIdAndUpdate(user._id, { token });
    res.send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

export const verification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (user === null) {
      throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.send({ message: "Email confirmed successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyAgain = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      throw HttpError(404);
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    await transport.sendMail({
      to: email,
      from: process.env.MY_EMAIL,
      subject: "Welcome to Contacts",
      html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${user.verificationToken}`,
    });
    res.send({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
