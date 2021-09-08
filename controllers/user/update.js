import HttpError from '../../models/HttpError.js';
import User from '../../models/User.js';

import db from '../../db/index.js';

const update = async (req, res, next) => {
  const { userDetails } = req.body;
  if (userDetails.password) {
    return next(
      new HttpError('Not able to change password with this route', 400)
    );
  }
  const userId = req.user.id;
  if (!userId || !userDetails) {
    return next(new HttpError('User id or user details not provided', 400));
  }
  if (userDetails.name) {
    userDetails.name = userDetails.name.toLowerCase().trim();
  }
  if (userDetails.email) {
    userDetails.email = userDetails.email.toLowerCase().trim();
  }
  try {
    const user = await db.updateUser(userId, userDetails, User);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export default update;
