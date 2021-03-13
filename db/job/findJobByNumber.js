module.exports = findJobByNumber = async (company, jobNumber, Job, HttpError) => {
  let query;

  if (company.toLowerCase() === 'srg') query = 'SRG_number'
  if (company.toLowerCase() === 'lub') query = 'LUB_number'
  try {
    const job = await Job.findOne({ query: jobNumber }).populate({
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
