module.exports = addJobToTrip = async (number, jobId, Trip) => {
  if (!number || !jobId) throw new Error('Number or job not provided');
  try {
    console.log(jobId);
    const trip = await Trip.findOne({ number });
    if (!trip) throw new Error('Trip does not exist!');
    console.log(trip);
    trip.jobs.push(jobId);
    await trip.save();
    return;
  } catch (err) {
    throw err;
  }
};
