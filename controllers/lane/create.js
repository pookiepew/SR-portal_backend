import Lane from '../../models/Lane.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const create = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    await db.laneAlreadyExists(name, Lane);
    const lane = await db.createNewLane(name, userId, Lane);
    res.status(201).json({ lane });
  } catch (err) {
    next(err);
  }
};

export default create;
