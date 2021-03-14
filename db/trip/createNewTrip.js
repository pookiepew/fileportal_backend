module.exports = createNewTrip = async (
  numbers,
  creator,
  Trip,
  HttpError
) => {
  if (!numbers) throw new Error('No trip number provided');
  try {
    const newTrip = new Trip({
      numbers,
      jobs: [],
      userGroups: [],
      creator
    });
    await newTrip.save();
    return newTrip;
  } catch (err) {
    throw err;
  }
};
