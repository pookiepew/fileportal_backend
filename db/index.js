const connect = require('./connect');

// USER
const findUserByEmail = require('./user/findUserByEmail');
const findUserById = require('./user/findUserById');
const saveUser = require('./user/saveUser');
const saveInvitedUser = require('./user/saveInvitedUser');
const findInvitedUser = require('./user/findInvitedUser');
const findInvitedUserByToken = require('./user/findInvitedUserByToken');
const tokenMatchInviteToken = require('./user/tokenMatchInviteToken');

// TRIP
const createNewTrip = require('./trip/createNewTrip');
const addJobToTrip = require('./trip/addJobToTrip');
const findTripByNumber = require('./trip/findTripByNumber');
const tripAlreadyExists = require('./trip/tripAlreadyExists');

// JOB
const createNewJob = require('./job/createNewJob');
const findJobByNumber = require('./job/findJobByNumber');
const jobAlreadyExists = require('./job/jobAlreadyExists');


// USERGROUPS
const createUserGroup = require('./usergroup/createUserGroup')
const addUserToUserGroups = require('./usergroup/addUserToUserGroups')

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
  createUserGroup,
  addUserToUserGroups
};
