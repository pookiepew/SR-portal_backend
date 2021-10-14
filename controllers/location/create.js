import db from '../../db/index.js';

import Location from '../../models/Location.js';

import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const userId = req.user.id;

  let { address, postalcode, postalarea, country } = req.body;

  if (!address || !postalcode || !postalarea || !country) {
    return next(
      new HttpError(
        'Address, postalcode, postalarea and country needs to be provided',
        401
      )
    );
  }

  address = address.toLowerCase().trim();
  postalcode = postalcode.toLowerCase().trim();
  postalarea = postalarea.toLowerCase().trim();
  country = country.toLowerCase().trim();

  try {
    const location = await db.location.createNew(
      address,
      postalcode,
      postalarea,
      country,
      userId,
      Location,
      HttpError
    );

    res.status(201).json({ location });
  } catch (error) {
    next(error);
  }
};

export default create;
