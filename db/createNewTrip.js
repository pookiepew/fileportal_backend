module.exports = createNewTrip = async (tripNumber, creator, Trip) => {
  if (!tripNumber) throw new Error('No trip number provided');
  try {
    const newTrip = new Trip({
      number: tripNumber,
      job: [],
      creator,
    });
    await newTrip.save();
    return newTrip;
  } catch (err) {
    throw err;
  }
};
