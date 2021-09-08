import Job from '../../models/Job.js';
import HttpError from '../../models/HttpError.js';

const findAll = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.json({ count: jobs.length, jobs });
  } catch (err) {
    next(err);
  }
};

export default findAll;
