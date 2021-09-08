import Role from '../../models/Role.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';
import User from '../../models/User.js';

const create = async (req, res, next) => {
  const { access, feature } = req.body;
  const userId = req.user._id;
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  if (!access || !feature) {
    const error = new HttpError('Access or Feature not provided', 400);
    return next(error);
  }
  try {
    const existingRoles = await Role.find();
    for (let i = 0; existingRoles.length > i; i++) {
      if (
        existingRoles[i].feature === feature &&
        existingRoles[i].access === access
      ) {
        return next(
          new HttpError('Role with that feature and access already exists', 400)
        );
      }
    }
    const role = await db.createRole(feature, access, userId, Role);
    await db.addRoleToUser(userId, role._id, User, HttpError);
    res.status(201).json({ role });
  } catch (error) {
    next(error);
  }
};

export default create;
