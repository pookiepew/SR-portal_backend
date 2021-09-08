import jwt from 'jsonwebtoken';

import config from '../../config.js';

import HttpError from '../../models/HttpError.js';
import InvitedUser from '../../models/InvitedUser.js';

import db from '../../db/index.js';

import createJwtToken from '../../functions/createJwtToken.js';

const generateNewInviteToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new HttpError('Token not provided, access denied', 401));
  }
  try {
    if (!(await db.tokenMatchInviteToken(token, InvitedUser))) {
      return next(new HttpError('Invalid token', 401));
    }
    const invitedUser = await db.findInvitedUserByToken(
      token,
      InvitedUser,
      HttpError
    );
    if (!invitedUser) {
      return next(new HttpError('No user found', 404));
    }
    const payload = { user: { email: invitedUser.email } };
    const expiresIn = '30 minutes';
    const newToken = await createJwtToken(payload, expiresIn, jwt, config);
    invitedUser.token = newToken;
    await invitedUser.save();
    // Send new invitation mail
    res.json({
      msg: 'New invitation email sent, please check your mail.',
      token: newToken,
    });
  } catch (err) {
    next(err);
  }
};

export default generateNewInviteToken;
