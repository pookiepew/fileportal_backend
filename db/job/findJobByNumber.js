module.exports = findJobById = async (number, Job, HttpError) => {
  if (!number) throw new Error('No job number provided');
  try {
    const job = await Job.findOne({ number }).populate({
      path: 'file'
    });
    if (!job) {
      const error = new HttpError('Job not found', 404);
      throw error;
    }
    return job;
  } catch (err) {
    throw err;
  }
};
