import db from "../../db/index.js";
import Area from "../../models/Area.js";
import AreaCode from "../../models/AreaCode.js";

const create = async (req, res, next) => {
  const userId = req.user.id;
  const { areacodeId } = req.body;
  try {
    const areacode = await AreaCode.findById({ _id: areacodeId });

    const area = await db.area.createNew(areacode._id, userId, Area);

    res.status(201).json({ area });
  } catch (error) {
    next(error);
  }
};

export default create;
