module.exports = addJobToTrip = async (id, jobId, Trip) => {
  try {
    const trip = await Trip.findById(id);
    if (!trip) throw new Error('Trip does not exist!');
    trip.jobs.push(jobId);
    await trip.save();
    return;
  } catch (err) {
    throw err;
  }
};
