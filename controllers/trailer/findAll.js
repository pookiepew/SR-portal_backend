import Trailer from '../../models/Trailer.js';

const findAll = async (req, res, next) => {
  try {
    const trailers = await Trailer.find()
      .populate({
        path: 'currentLocation.areaCode',
        select: 'name',
      })
      .populate({
        path: 'nextLocation.areaCode',
        select: 'name',
      })
      .populate({
        path: 'type',
        select: 'name',
      })
      .populate({
        path: 'creator',
        select: 'name email',
      });
    res.json({ count: trailers.length, trailers });
  } catch (error) {
    next(error);
  }
};

export default findAll;
