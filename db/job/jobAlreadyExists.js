module.exports = jobAlreadyExists = async (number, Job) => {
  if (!number) throw new Error('Number to provided');
  try {
    const job = await Job.findOne({ number });
    if (job) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
