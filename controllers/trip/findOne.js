import Trip from '../../models/Trip.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const findOne = async (req, res, next) => {
  const { number } = req.query;
  // if (!number) {
  //   const error = new HttpError('No trip number provided', 400);
  //   return next(error);
  // }
  try {
    const trip = await db.findTripByNumber(number, Trip, HttpError);
    res.json({ trip });
  } catch (err) {
    next(err);
  }
};

export default findOne;
