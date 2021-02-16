module.exports = findJobById = async (number, Job) => {
  if (!number) throw new Error('No job number provided');
  try {
    const job = await Job.findOne({ number }).populate({
      path: 'file',
    });

    return job;
  } catch (err) {
    throw err;
  }
};
