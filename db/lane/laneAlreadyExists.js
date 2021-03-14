const HttpError = require('../../models/HttpError');
const tripAlreadyExists = require('../trip/tripAlreadyExists');

module.exports = laneAlreadyExists = async (name, Lane) => {
  try {
    const lane = await Lane.findOne({ name });
    if (lane) throw new Error('Lane already exists');
    return;
  } catch (err) {
    throw err;
  }
};
