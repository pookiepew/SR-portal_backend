import HttpError from '../../models/HttpError.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';

import db from '../../db/index.js';

const addUser = async (req, res, next) => {
  try {
    const { roleId, userId } = req.body;
    const role = await db.findRoleById(roleId, Role);
    if (!role) {
      return next(
        new HttpError('Role does not exist, please create one first', 400)
      );
    }
    role.users.push(userId);
    await role.save();
    await db.addRoleToUser(userId, roleId, User);
    res.status(201).json({ role });
  } catch (error) {
    next(error);
  }
};

export default addUser;
