import db from '../../db/index.js';

import TrailerType from '../../models/TrailerType.js';
import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const userId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return next(new HttpError('Name must be provided', 400));
  }
  try {
    const trailerType = await db.createTrailerType(name, userId, TrailerType);
    res.status(201).json({ trailerType });
  } catch (error) {
    next(error);
  }
};

export default create;
