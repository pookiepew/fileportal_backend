module.exports = fieldsAreMissing = async (trip) => {
  if (!trip.numbers) throw new Error('Trip number is required!');
  if (!trip.lane) throw new Error('Trip lane is required!');
  if (!trip.userGroups) throw new Error('Usergroups are required!');
  return;
};
