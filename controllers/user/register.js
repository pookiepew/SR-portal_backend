import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config.js';

import InvitedUser from '../../models/InvitedUser.js';
import HttpError from '../../models/HttpError.js';
import User from '../../models/User.js';
import Role from '../../models/Role.js';

import db from '../../db/index.js';

import hashPassword from '../../functions/hashPassword.js';
import createJwtToken from '../../functions/createJwtToken.js';

const register = async (req, res, next) => {
  let { firstName, surName, email, password1, password2, role } = req.body;

  const { token: invitationToken } = req.user;

  if (!firstName || !surName || !email || !password1 || !password2) {
    return next(new HttpError('Name, email, password not provided', 400));
  }

  const invititationEmail = email.toLowerCase().trim();

  const formattedFirstName = firstName.toLowerCase().trim();

  const formattedSurName = surName.toLowerCase().trim();

  const formattedName = formattedFirstName + ' ' + formattedSurName;

  if (password1 !== password2) {
    return next(new HttpError('Passwords does not match', 400));
  }

  if (req.user && req.user.email !== invititationEmail) {
    return next(new HttpError('Authorization error', 401));
  }

  if (!invitationToken) {
    return next(new HttpError('Authorization error', 401));
  }

  if (!(await db.tokenMatchInviteToken(invitationToken, InvitedUser))) {
    return next(new HttpError('Invalid token', 401));
  }

  if (!role) role = '60d9cc8d9c2e580507cbe946';

  try {
    let user = await db.findUserByEmail(invititationEmail, User);
    if (user) {
      return next(
        new HttpError('User already exists, please use another email', 400)
      );
    }

    const invitedUser = await db.findInvitedUser(
      invititationEmail,
      InvitedUser,
      HttpError
    );
    invitedUser.accepted = true;
    invitedUser.token = 'accepted';
    invitedUser.name = formattedName;
    await invitedUser.save();

    const hashedPassword = await hashPassword(password1, bcrypt);
    user = await db.saveUser(
      formattedName,
      invititationEmail,
      hashedPassword,
      role,
      invitedUser.invitedBy,
      User
    );
    const expiresIn = config.JWT_EXPIRETIME;
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);
    await db.addUserToRole(user._id, role, Role, HttpError);

    res.json({ user: { ...user._doc, token } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default register;
