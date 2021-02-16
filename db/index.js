const connect = require('./connect');
const findUserByEmail = require('./findUserByEmail');
const saveUser = require('./saveUser');
const createNewTrip = require('./createNewTrip');
const findTripById = require('./findTripById');

module.exports = {
  connect,
  findUserByEmail,
  saveUser,
  createNewTrip,
  findTripById,
};
