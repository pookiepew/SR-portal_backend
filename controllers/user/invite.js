import jwt from 'jsonwebtoken';

import config from '../../config.js';

import HttpError from '../../models/HttpError.js';
import User from '../../models/User.js';
import InvitedUser from '../../models/InvitedUser.js';

import db from '../../db/index.js';

import createJwtToken from '../../functions/createJwtToken.js';

import invitationTemplate from '../../mail-templates/invitation-template.js';
import sendMail from '../../functions/sendMail.js';

const invite = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new HttpError('Email not provided', 400));
  }
  const invititationEmail = email.toLowerCase().trim();
  const userId = req.user.id;
  if (!userId) {
    return next(new HttpError('Not authorized', 401));
  }
  try {
    const userExists = await db.findUserByEmail(invititationEmail, User);
    if (userExists) {
      const error = new HttpError('User with that email already exists', 400);
      return next(error);
    }
    let invitedUser = await db.findInvitedUser(
      invititationEmail,
      InvitedUser,
      HttpError
    );
    if (invitedUser) {
      const error = new HttpError(
        'User with that email is already invited',
        400
      );
      return next(error);
    }
    const userWhoInvites = await db.findUserById(
      userId,
      '-password',
      User,
      HttpError
    );
    const payload = { user: { email: invititationEmail } };
    const expiresIn = '24h';
    const token = await createJwtToken(payload, expiresIn, jwt, config);
    invitedUser = await db.saveInvitedUser(
      invititationEmail,
      userWhoInvites._id,
      token,
      InvitedUser
    );

    const HTML = invitationTemplate(
      invititationEmail,
      userWhoInvites,
      token,
      HttpError
    );

    await sendMail(
      invititationEmail,
      'invite-user',
      HTML,
      token,
      config,
      HttpError
    );

    // WS emit update ?

    res.json({
      msg: 'Successfully sent invitation to ' + invititationEmail,
    });
  } catch (err) {
    next(err);
  }
};

export default invite;
