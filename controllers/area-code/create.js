import db from "../../db/index.js";

import Area from "../../models/Area.js";
import AreaCode from "../../models/AreaCode.js";
import HttpError from "../../models/HttpError.js";

const create = async (req, res, next) => {
  const userId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return next(new HttpError("Name must be provided", 400));
  }
  try {
    const areaCode = await db.areaCode.createNew(name, userId, AreaCode);
    await db.area.createNew(areaCode._id, userId, Area);
    res.status(201).json({ areaCode });
  } catch (error) {
    next(error);
  }
};

export default create;
