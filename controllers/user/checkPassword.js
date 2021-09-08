import bcrypt from 'bcryptjs';

import User from '../../models/User.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const checkPassword = async (req, res, next) => {
  const { password } = req.body;

  const userId = req.user.id;

  if (!userId) {
    return next(new HttpError('No userId', 400));
  }
  try {
    const user = await db.findUserById(userId, '', User, HttpError);

    if (!user) {
      return next(new HttpError('User not found', 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send();

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default checkPassword;
