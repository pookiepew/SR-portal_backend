import bcrypt from 'bcryptjs';

import hashPassword from '../../functions/hashPassword.js';

import User from '../../models/User.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const changePassword = async (req, res, next) => {
  const { password1, password2 } = req.body;

  if (password1 !== password2) {
    return next(new HttpError('Passwords do not match', 400));
  }

  const userId = req.user.id;

  if (!userId) {
    return next(new HttpError('No userId', 400));
  }
  try {
    const user = await db.findUserById(userId, '', User, HttpError);

    user.depopulate();

    if (!user) {
      return next(new HttpError('User not found', 404));
    }

    const hashedPassword = await hashPassword(password1, bcrypt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default changePassword;
