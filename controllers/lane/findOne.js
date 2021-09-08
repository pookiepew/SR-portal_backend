import Lane from '../../models/Lane.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const findOne = async (req, res, next) => {
  const { name } = req.query;
  try {
    const lane = await db.findLaneByName(name, Lane, HttpError);
    res.json({ lane });
  } catch (err) {
    next(err);
  }
};

export default findOne;
