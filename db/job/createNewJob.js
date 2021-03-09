module.exports = createNewJob = async (number, trip, info, creator, Job) => {
  if (!number || !trip || !creator)
    throw new Error('Number, trip or creator missing');
  try {
    const job = new Job({
      number,
      trip,
      files: [],
      info,
      creator,
    });
    await job.save();
    return job;
  } catch (err) {
    throw err;
  }
};
