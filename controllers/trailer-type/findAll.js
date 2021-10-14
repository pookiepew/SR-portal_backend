import TrailerType from '../../models/TrailerType.js';

const findAll = async (req, res, next) => {
  try {
    const trailerType = await TrailerType.find().sort({ name: 1 });
    res.json({ trailerType });
  } catch (error) {
    next(error);
  }
};

export default findAll;
