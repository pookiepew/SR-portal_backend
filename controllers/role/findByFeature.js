import Role from '../../models/Role.js';
import HttpError from '../../models/HttpError.js';
import db from '../../db/index.js';

const findByFeature = async (req, res, next) => {
  try {
    const { feature } = req.query;
    if (!feature) {
      const error = new HttpError('Feature not provided', 400);
      return next(error);
    }
    const role = await db.findRoleByFeature(feature, Role);
    res.json({ role });
  } catch (err) {
    next(err);
  }
};

export default findByFeature;
