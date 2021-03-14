module.exports = tripAlreadyExists = async (numbers, Trip) => {
  if (!numbers) throw new Error('Number not provided');
  try {
    const trip = await Trip.findOne({ numbers });
    if (trip) return true;
    return false;
  } catch (err) {
    throw err;
  }
};
