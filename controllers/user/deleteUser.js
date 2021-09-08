import db from '../../db/index.js';
import DeletedUser from '../../models/DeletedUser.js';
import HttpError from '../../models/HttpError.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next(new HttpError('User ID not provided, please provide one', 400));
  }
  try {
    const user = await db.findUserById(userId, '', User, HttpError);
    if (!user) {
      return next(new HttpError('User not found', 404));
    }
    user.roles.forEach(async (roleId) => {
      await db.removeUserFromRole(roleId, userId, Role);
    });

    await user.depopulate();

    await DeletedUser.findOneAndUpdate({ _id: user._id }, user, {
      upsert: true,
    });

    await db.deleteUser(userId, User);
    res.json({ msg: 'User deleted', userId });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default deleteUser;
