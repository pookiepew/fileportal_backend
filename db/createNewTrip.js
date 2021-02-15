module.exports = createNewTrip = async (tripNumber, creatorID, Trip) => {
  if (!tripNumber) throw new Error('No trip number provided');
  try {
    const newTrip = new Trip({
      number: tripNumber,
      job: [],
      creator: creatorID
    });
    await newTrip.save();
    return newTrip;
  } catch (err) {
    throw err;
  }
};
