import AreaCode from "../../models/AreaCode.js";

const findAll = async (req, res, next) => {
  try {
    const areacodes = await AreaCode.find();
    res.json({ areacodes });
  } catch (error) {
    next(error);
  }
};

export default findAll;
