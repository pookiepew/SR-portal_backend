import db from '../../db/index.js';

import Job from '../../models/Job.js';
import HttpError from '../../models/HttpError.js';

const findOne = async (req, res, next) => {
  const { company, jobNumber } = req.query;
  if (!company || !jobNumber) {
    const error = new HttpError(
      'A company and jobnumber must be provided',
      400
    );
    return next(error);
  }
  try {
    const job = await db.findJobByNumber(company, jobNumber, Job, HttpError);
    res.json({ job });
  } catch (err) {
    next(err);
  }
};

export default findOne;
