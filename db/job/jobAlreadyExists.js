module.exports = jobAlreadyExists = async (numbers, Job, HttpError) => {
  try {
    const job = await Job.findOne({ numbers });
    if (job) throw new HttpError('Job already exists', 200);
  } catch (err) {
    throw err;
  }
};

// const error = new HttpError('Job already exists', 200);
