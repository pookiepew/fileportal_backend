module.exports = createNewTrip = async (
  tripNumber,
  creator,
  Trip,
  HttpError
) => {
  if (!tripNumber) throw new Error('No trip number provided');
  try {
    const newTrip = new Trip({
      number: tripNumber,
      jobs: [],
      creator
    });
    await newTrip.save();
    return newTrip;
  } catch (err) {
    throw err;
  }
};
