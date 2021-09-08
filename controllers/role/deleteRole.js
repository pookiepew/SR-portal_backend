import db from '../../db/index.js';
import HttpError from '../../models/HttpError.js';
import Role from '../../models/Role.js';

const deleteRole = async (req, res, next) => {
  const { roleId } = req.body;
  if (!roleId) {
    return next(new HttpError('Role ID not provided', 400));
  }
  try {
    await db.deleteRole(roleId, Role);
    res.json({ msg: 'Role successfully deleted' });
  } catch (error) {
    next(error);
  }
};

export default deleteRole;
