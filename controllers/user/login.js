import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../config.js";

import HttpError from "../../models/HttpError.js";
import User from "../../models/User.js";

import db from "../../db/index.js";

import createJwtToken from "../../functions/createJwtToken.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const credentialsFail = new HttpError("Invalid credentials", 401);

  if (!email || !password) {
    return next(new HttpError("Email and password needs to be provided", 400));
  }

  const formattedEmail = email.toLowerCase().trim();

  try {
    const user = await db.findUserByEmail(formattedEmail, User);

    if (!user) return next(credentialsFail);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(credentialsFail);

    const expiresIn = config.JWT_EXPIRETIME;
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);

    res.json({ user: { ...user._doc, token } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default login;
