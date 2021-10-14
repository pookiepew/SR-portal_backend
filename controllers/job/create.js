import db from '../../db/index.js';

import Job from '../../models/Job.js';
import Trip from '../../models/Trip.js';
import HttpError from '../../models/HttpError.js';

const create = async (req, res, next) => {
  const { job } = req.body;
  const userId = req.user.id;
  try {
    await db.job.alreadyExists(job.numbers, Job, HttpError);
    const newJob = await db.job.createNew(job, userId, Job);
    await db.addJobToTrip(job.trip, newJob._id, Trip);
    res.status(201).json({ job: newJob });
  } catch (err) {
    next(err);
  }
};

export default create;
