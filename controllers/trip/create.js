import Trip from '../../models/Trip.js';
import Lane from '../../models/Lane.js';
import HttpError from '../../models/HttpError.js';

import db from '../../db/index.js';

const create = async (req, res, next) => {
  const { trip } = req.body;
  const userId = req.user.id;
  try {
    await db.fieldsAreMissing(trip, HttpError);
    await db.tripAlreadyExists(trip.numbers, Trip, HttpError);
    const lane = await db.findLaneByName(trip.lane, Lane, HttpError);
    const newTrip = await db.createNewTrip(trip, userId, lane, Trip);
    res.status(201).json({ trip: newTrip });
  } catch (err) {
    next(err);
  }
};

export default create;
