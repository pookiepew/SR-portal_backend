import db from "../../db/index.js";
import HttpError from "../../models/HttpError.js";
import User from "../../models/User.js";
import Role from "../../models/Role.js";

const addRole = async (req, res, next) => {
  const { userId, feature, access } = req.body;
  if (!userId || !feature || !access) {
    return next(
      new HttpError("User ID, Feature and Access must be provided", 400)
    );
  }

  let roleIdToRemove = null;

  try {
    const user = await db.findUserById(userId, "-password", User, HttpError);
    if (!user) {
      return next(new HttpError("User does not exist", 400));
    }

    const role = await db.findRoleByAccess(access, feature, Role, HttpError);
    if (!role) {
      return next(new HttpError("Role does not exist", 400));
    }

    for (let i = 0; user.roles.length > i; i++) {
      if (user.roles[i]._id.toString() === role._id.toString()) {
        throw new HttpError("Role already added", 400);
      }
      if (user.roles[i].feature === feature) {
        await db.removeUserFromRole(user.roles[i]._id.toString(), userId, Role);
        roleIdToRemove = user.roles[i]._id.toString();
      }
    }

    await user.depopulate();
    if (roleIdToRemove) {
      user.roles = user.roles.filter((id) => id.toString() !== roleIdToRemove);
    }
    user.roles.push(role._id);
    await user.save();
    await db.addUserToRole(userId, role._id, Role);

    const updatedUser = await db.findUserById(
      userId,
      "-password -createdAt -updatedAt",
      User,
      HttpError
    );

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export default addRole;
