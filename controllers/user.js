const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const db = require('../db/index');
const User = require('../models/User');
const InvitedUser = require('../models/InvitedUser');

const HttpError = require('../models/HttpError');

const hashPassword = require('../functions/hashPassword');
const createJwtToken = require('../functions/createJwtToken');
const UserGroup = require('../models/UserGroup');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const credentialsFail = new HttpError('Invalid Credentials', 400);

    const user = await db.findUserByEmail(email, User);

    if (!user) return next(credentialsFail);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(credentialsFail);

    const expiresIn = '365 days';
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);

    res.json({ user: { name: user.name, email, token } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password1, password2, userGroup } = req.body;
  if (!name || !email || !password1 || !password2 || !userGroup) {
    return next(
      new HttpError('Name, email, password or userGroup not provided', 400)
    );
  }
  if (password1 !== password2) {
    return next(new HttpError('Passwords does not match', 400));
  }
  if (req.user && req.user.email !== email) {
    return next(new HttpError('Authorization error', 401));
  }
  try {
    let user = await db.findUserByEmail(email, User);
    if (user) {
      return next(
        new HttpError('User already exists, please use another email', 400)
      );
    }
    const hashedPassword = await hashPassword(password1, bcrypt);
    user = await db.saveUser(name, email, hashedPassword, userGroup, User);
    const expiresIn = '365 days';
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);
    await db.addUserToUserGroups(user._id, userGroup, UserGroup);

    res.status(201).json({ user: { name, email, token } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const invite = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    const error = new HttpError('Email not provided', 400);
    return next(error);
  }
  const userId = req.user.id;
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  try {
    const userExists = await db.findUserByEmail(email, User);
    if (userExists) {
      const error = new HttpError('User with that email already exists', 400);
      return next(error);
    }
    let invitedUser = await db.findInvitedUser(email, InvitedUser);
    if (invitedUser) {
      const error = new HttpError(
        'User with that email is already invited',
        400
      );
      return next(error);
    }
    const filter = '-password -createdAt -updatedAt';
    const userWhoInvites = await db.findUserById(
      userId,
      filter,
      User,
      HttpError
    );
    const payload = { user: { email } };
    const expiresIn = '30 minutes';
    const token = await createJwtToken(payload, expiresIn, jwt, config);
    invitedUser = await db.saveInvitedUser(
      email,
      userWhoInvites._id,
      token,
      InvitedUser
    );

    // Send invitation mail
    // WS emit update ?

    res.json({ msg: 'Successfully sent invitation to ' + email, token });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  const { email, token } = req.body;
  if (!email || !token) {
    return next(
      new HttpError('Email or Token not provided, access denied', 401)
    );
  }
  if (req.user && req.user.email !== email) {
    return next(new HttpError('Email does not match token', 401));
  }
  try {
    if (!(await db.tokenMatchInviteToken(token, InvitedUser))) {
      return next(new HttpError('Invalid token', 401));
    }
    const invitedUser = await db.findInvitedUser(email, InvitedUser);
    invitedUser.accepted = true;
    invitedUser.token = 'accepted';
    await invitedUser.save();
    const payload = { user: { email } };
    const expiresIn = '1 day';
    const newToken = await createJwtToken(payload, expiresIn, jwt, config);
    res.json({ user: { email, token: newToken } });
  } catch (err) {
    next(err);
  }
};

const generateNewInviteToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new HttpError('Token not provided, access denied', 401));
  }
  try {
    if (!(await db.tokenMatchInviteToken(token, InvitedUser))) {
      return next(new HttpError('Invalid token', 401));
    }
    const invitedUser = await db.findInvitedUserByToken(token, InvitedUser);
    if (!invitedUser) {
      return next(new HttpError('No user found', 404));
    }
    const payload = { user: { email: invitedUser.email } };
    const expiresIn = '30 minutes';
    const newToken = await createJwtToken(payload, expiresIn, jwt, config);
    invitedUser.token = newToken;
    await invitedUser.save();
    // Send new invitation mail
    res.json({
      msg: 'New invitation email sent, please check your mail.',
      token: newToken,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { userDetails } = req.body;
  if (userDetails.password) {
    return next(
      new HttpError('Not able to change password with this route', 400)
    );
  }
  const userId = req.user.id;
  if (!userId || !userDetails) {
    return next(new HttpError('User id or user details not provided', 400));
  }
  try {
    const user = await db.updateUser(userId, userDetails, User);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  invite,
  acceptInvite,
  generateNewInviteToken,
  update,
  findAll,
};
