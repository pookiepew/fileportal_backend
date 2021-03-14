module.exports = fieldsAreMissing = async (trip, HttpError) => {
  if (trip.lane && trip.lane.split('-')[0] === 'NO') {
    if (!trip.numbers.SRG)
      throw new HttpError('SRG trip number is required!', 400);
  }
  if (trip.lane && trip.lane.split('-')[0] !== 'NO') {
    if (!trip.numbers.LUB)
      throw new HttpError('LUB trip number is required!', 400);
  }
  if (!trip.lane) throw new HttpError('Trip lane is required!', 400);
  if (!trip.userGroups) throw new HttpError('Usergroups are required!', 400);
  return;
};
