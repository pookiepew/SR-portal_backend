import Trailer from '../../models/Trailer.js';

const update = async (req, res, next) => {
  const { trailerId } = req.body;
  try {
    const filter = { _id: trailerId };
    const update = {};
    const trailer = await Trailer.findOneAndUpdate(filter, update, {
      new: true,
    });
  } catch (error) {
    next(error);
  }
};

export default update;
