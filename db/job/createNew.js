const createNew = async (job, creator, Job) => {
  try {
    const newJob = new Job({
      ...job,
      files: [],
      creator,
    });
    await newJob.save();
    return newJob;
  } catch (err) {
    throw err;
  }
};

export default createNew;
