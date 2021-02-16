module.exports = findTripById = async (number, Trip) => {
  if (!number) throw new Error('No trip number provided');
  try {
    const trip = await Trip.findOne({ number }).populate({
      path: 'creator',
      select: 'name email -_id',
    });

    return trip;
  } catch (err) {
    throw err;
  }
};
