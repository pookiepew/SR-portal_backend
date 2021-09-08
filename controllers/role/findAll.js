import Role from '../../models/Role.js';
import HttpError from '../../models/HttpError.js';

const findAll = async (req, res, next) => {
  try {
    const roles = await Role.find().populate({
      path: 'users',
      select: 'name email',
    });
    res.json({
      count: roles.length,
      roles,
    });
  } catch (err) {
    next(err);
  }
};

export default findAll;
