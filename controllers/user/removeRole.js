import db from '../../db/index.js';
import HttpError from '../../models/HttpError.js';
import User from '../../models/User.js';
import Role from '../../models/Role.js';

const removeRole = async (req, res, next) => {
  const { userId, roleId } = req.body;
  if (!roleId) {
    return next(new HttpError('Role ID must be provided', 400));
  }
  try {
    const user = await db.removeRoleFromUser(userId, roleId, User);
    await db.removeUserFromRole(roleId, userId, Role);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export default removeRole;
