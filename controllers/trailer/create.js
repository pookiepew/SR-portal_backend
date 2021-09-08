import db from '../../db/index.js';

import Trailer from '../../models/Trailer.js';
import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const userId = req.user.id;
  const {
    regNumber,
    type,
    currentLocation,
    nextLocation,
    geoLocation,
    specs,
    imgURL,
  } = req.body;

  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  if (
    !regNumber ||
    !type ||
    !currentLocation ||
    !nextLocation ||
    !geoLocation ||
    !specs ||
    !imgURL
  ) {
    return next(new HttpError('All fields must be provided', 400));
  }
  try {
    const existingTrailers = await Trailer.find();
    for (let i = 0; existingTrailers.length > i; i++) {
      if (existingTrailers[i].regNumber === regNumber) {
        return next(new HttpError('Registration Number already exists', 400));
      }
    }
    const trailer = await db.createTrailer(
      regNumber,
      type,
      currentLocation,
      nextLocation,
      geoLocation,
      specs,
      imgURL,
      userId,
      Trailer
    );
    res.json({ trailer });
  } catch (error) {
    next(error);
  }
};

export default create;
