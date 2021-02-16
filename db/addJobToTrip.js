module.exports = addJobToTrip = async (number, jobId, Trip) => {
  if (!number || !jobId) throw new Error('Number or job not provided');
  try {
    await Trip.findOneAndUpdate({ number }, { job: { $push: { id: jobId } } });
    return;
  } catch (err) {
    throw err;
  }
};
