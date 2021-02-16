const connect = require('./connect');

const findUserByEmail = require('./findUserByEmail');
const saveUser = require('./saveUser');

const createNewTrip = require('./createNewTrip');
const addJobToTrip = require('./addJobToTrip');
const findTripByNumber = require('./findTripByNumber');
const tripAlreadyExists = require('./tripAlreadyExists');

const createNewJob = require('./createNewJob');
const findJobByNumber = require('./findJobByNumber');
const jobAlreadyExists = require('./jobAlreadyExists');

module.exports = {
  connect,
  findUserByEmail,
  saveUser,
  createNewTrip,
  addJobToTrip,
  findTripByNumber,
  tripAlreadyExists,
  createNewJob,
  findJobByNumber,
  jobAlreadyExists
};
