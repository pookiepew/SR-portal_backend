import AreaCode from '../../models/AreaCode.js';

const findAll = async (req, res, next) => {
  try {
    const areaCodes = await AreaCode.find();
    res.json({ count: areaCodes.length, areaCodes });
  } catch (error) {
    next(error);
  }
};

export default findAll;
