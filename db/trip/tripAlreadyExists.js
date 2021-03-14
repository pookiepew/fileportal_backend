module.exports = tripAlreadyExists = async (numbers, Trip, HttpError) => {
  try {
    const trip = await Trip.findOne({ numbers });
    if (trip) throw new HttpError('Trip already exists', 200);
  } catch (err) {
    throw err;
  }
};
