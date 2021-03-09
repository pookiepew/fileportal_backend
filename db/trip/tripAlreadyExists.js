module.exports = tripAlreadyExists = async (number, Trip) => {
  if (!number) throw new Error('Number not provided');
  try {
    const trip = await Trip.findOne({ number });
    if (trip) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
