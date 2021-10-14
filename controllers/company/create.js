import db from '../../db/index.js';

import Company from '../../models/Company.js';

import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const userId = req.user.id;

  let { name, team, location } = req.body;

  if (!name || !team || !location) {
    return next(
      new HttpError('Name, team and location needs to be provided', 400)
    );
  }

  name = name.toLowerCase().trim();

  try {
    const company = await db.company.createNew(
      name,
      team,
      location,
      userId,
      Company,
      HttpError
    );

    res.status(201).json({ company });
  } catch (error) {
    next(error);
  }
};

export default create;
