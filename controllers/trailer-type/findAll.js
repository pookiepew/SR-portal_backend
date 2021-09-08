import TrailerType from '../../models/TrailerType.js';

const findAll = async (req, res, next) => {
  try {
    const trailerType = await TrailerType.find();
    res.json({ trailerType });
  } catch (error) {
    next(error);
  }
};

export default findAll;
