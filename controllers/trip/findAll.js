import Trip from '../../models/Trip.js';
import HttpError from '../../models/HttpError.js';

const findAll = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json({ count: trips.length, trips });
  } catch (err) {
    next(err);
  }
};

export default findAll;
