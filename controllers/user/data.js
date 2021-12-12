import jwt from "jsonwebtoken";

import config from "../../config.js";

import HttpError from "../../models/HttpError.js";
import User from "../../models/User.js";

import db from "../../db/index.js";

import createJwtToken from "../../functions/createJwtToken.js";

const data = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await db.findUserById(userId, "-password", User, HttpError);

    const expiresIn = "365 days";
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);

    res.json({ user: { ...user._doc, token } });
  } catch (error) {
    next(error);
  }
};

export default data;
