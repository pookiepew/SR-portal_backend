import jwt from 'jsonwebtoken';

import config from '../config.js';

import User from '../models/User.js';
import InvitedUser from '../models/InvitedUser.js';
import HttpError from '../models/HttpError.js';

import decodeJwtToken from '../functions/decodeJwtToken.js';

import db from '../db/index.js';

const checkAuth = async (req, res, next) => {
  let token;
  const bearer = req.header('Authorization');
  if (bearer) token = bearer.split(' ')[1];
  if (!token) {
    const error = new HttpError('Unauthorized', 401);
    return next(error);
  }
  try {
    const decodedToken = await decodeJwtToken(token, jwt, config, HttpError);

    let user = null;

    if (decodedToken.user.email) {
      const email = decodedToken.user.email.toLowerCase().trim();
      user = await db.findInvitedUser(email, InvitedUser, HttpError);
    }

    if (decodedToken.user.id) {
      user = await db.findUserById(decodedToken.user.id, '-password', User);
    }

    if (!user) {
      throw new HttpError('Not authorized', 401);
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
