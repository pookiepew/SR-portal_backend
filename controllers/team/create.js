import db from '../../db/index.js';

import Team from '../../models/Team.js';

import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const userId = req.user.id;

  let { name, location } = req.body;

  if (!name || !location) {
    return next(new HttpError('Name and location needs to be provided', 400));
  }

  name = name.toLowerCase().trim();

  try {
    const team = await db.team.createNew(
      name,
      location,
      userId,
      Team,
      HttpError
    );

    res.status(201).json({ team });
  } catch (error) {
    next(error);
  }
};

export default create;
