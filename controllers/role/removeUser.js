import db from '../../db/index.js';
import HttpError from '../../models/HttpError.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';

const removeUser = async (req, res, next) => {
  const { roleId, userId } = req.body;
  if (!roleId || !userId) {
    return next(new HttpError('Role ID and User ID must be provided', 400));
  }
  try {
    const role = await db.removeUserFromRole(roleId, userId, Role);
    await db.removeRoleFromUser(userId, roleId, User);
    res.json({ role });
  } catch (error) {
    next(error);
  }
};

export default removeUser;
