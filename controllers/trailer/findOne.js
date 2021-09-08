import db from '../../db/index.js';

import HttpError from '../../models/HttpError.js';
import Trailer from '../../models/Trailer.js';

const findOne = async (req, res, next) => {
  const trailerId = req.params.id;
  if (!trailerId) {
    return next(new HttpError('Trailer ID must be provided', 400));
  }
  try {
    const trailer = await db.findTrailerById(trailerId, Trailer);
    res.json({ trailer });
  } catch (error) {
    next(error);
  }
};

export default findOne;
