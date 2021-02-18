const connect = require('./connect');

// USER
const findUserByEmail = require('./findUserByEmail');
const findUserById = require('./findUserById');
const saveUser = require('./saveUser');
const saveInvitedUser = require('./saveInvitedUser');
const findInvitedUser = require('./findInvitedUser');
const findInvitedUserByToken = require('./findInvitedUserByToken');

// TRIP
const createNewTrip = require('./createNewTrip');
const addJobToTrip = require('./addJobToTrip');
const findTripByNumber = require('./findTripByNumber');
const tripAlreadyExists = require('./tripAlreadyExists');

// JOB
const createNewJob = require('./createNewJob');
const findJobByNumber = require('./findJobByNumber');
const jobAlreadyExists = require('./jobAlreadyExists');

const tokenMatchInviteToken = require('./tokenMatchInviteToken');

module.exports = {
  connect,
  findUserByEmail,
  findUserById,
  saveUser,
  saveInvitedUser,
  findInvitedUser,
  findInvitedUserByToken,
  createNewTrip,
  addJobToTrip,
  findTripByNumber,
  tripAlreadyExists,
  createNewJob,
  findJobByNumber,
  jobAlreadyExists,
  tokenMatchInviteToken,
};
