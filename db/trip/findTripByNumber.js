module.exports = findTripById = async (number, Trip, HttpError) => {
  if (!number) throw new Error('No trip number provided');
  try {
    const trip = await Trip.findOne({ number })
      .populate({
        path: 'creator',
        select: 'name email'
      })
      .populate({
        path: 'jobs',
        populate: { path: 'creator', select: 'name email' }
      });
    if (!trip) {
      const error = new HttpError('Trip not found', 404);
      throw error;
    }
    return trip;
  } catch (err) {
    throw err;
  }
};
