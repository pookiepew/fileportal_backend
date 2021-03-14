module.exports = createNewTrip = async (trip, creator, lane, Trip) => {
  try {
    const newTrip = new Trip({
      ...trip,
      lane,
      creator,
    });
    await newTrip.save();
    return newTrip;
  } catch (err) {
    throw err;
  }
};
