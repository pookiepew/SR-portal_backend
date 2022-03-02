import Area from "../../models/Area.js";

const findAll = async (req, res, next) => {
  try {
    const areas = await Area.find();
    res.json({ areas });
  } catch (error) {
    next(error);
  }
};

export default findAll;
