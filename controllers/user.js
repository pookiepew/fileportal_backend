const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const db = require('../db/index');
const User = require('../models/User');
const InvitedUser = require('../models/InvitedUser');

const HttpError = require('../models/HttpError');

const hashPassword = require('../functions/hashPassword');
const createJwtToken = require('../functions/createJwtToken');
const decodeJwtToken = require('../functions/decodeJwtToken');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const credentialsFail = new HttpError('Invalid Credentials', 400);

    const user = await db.findUserByEmail(email, User);

    if (!user) return next(credentialsFail);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(credentialsFail);

    const expiresIn = '5 days';
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);

    res.json({ user: { name: user.name, email, token } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = new HttpError('Name, email or password not provided', 400);
    return next(error);
  }
  try {
    let user = await db.findUserByEmail(email, User);
    if (user) {
      const error = new HttpError(
        'User already exists, please use another email',
        400
      );
      return next(error);
    }
    const hashedPassword = await hashPassword(password, bcrypt);
    user = await db.saveUser(name, email, hashedPassword, User);
    const expiresIn = '5 days';
    const payload = { user: { id: user._id } };
    const token = await createJwtToken(payload, expiresIn, jwt, config);

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

    res.json({ invitedUser, userWhoInvites });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    const error = new HttpError('Token not provided, access denied', 401);
    return next(error);
  }
  try {
    if (!(await db.tokenMatchInviteToken(token, InvitedUser))) {
      const error = new HttpError('Invalid token', 401);
      return next(error);
    }
    const { email } = req.user;
    const invitedUser = await db.findInvitedUser(email, InvitedUser);
    // invitedUser.accepted = true
    // invitedUser.token = 'accepted'
    // await invitedUser.save()

    // WS emit update
    // Add user to User
    // Send confirmation email
    // Create a new JWT
    // Return JWT
    res.json({ email, invitedUser });
  } catch (err) {
    next(err);
  }
};

const generateNewInviteToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    const error = new HttpError('Token not provided, access denied', 401);
    return next(error);
  }
  try {
    if (!(await db.tokenMatchInviteToken(token, InvitedUser))) {
      const error = new HttpError('Invalid token', 401);
      return next(error);
    }
    const invitedUser = await db.findInvitedUserByToken(token, InvitedUser);
    if (!invitedUser) {
      const error = new HttpError('No user found', 404);
      return next(error);
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

module.exports = {
  login,
  register,
  invite,
  acceptInvite,
  generateNewInviteToken,
};
