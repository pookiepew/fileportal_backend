module.exports = addJobToTrip = async (number, jobId, Trip) => {
  if (!number || !jobId) throw new Error('Number or job not provided');
  try {
    const trip = await Trip.findOne({ number });
    if (!trip) throw new Error('Trip does not exist!');
    trip.jobs.push(jobId);
    await trip.save();
    return;
  } catch (err) {
    throw err;
  }
};
