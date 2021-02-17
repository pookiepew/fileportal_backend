const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const db = require('../db/index');
const User = require('../models/User');

const HttpError = require('../models/HttpError');

const hashPassword = require('../functions/hashPassword');
const createJwtToken = require('../functions/createJwtToken');

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

module.exports = {
  register,
  login,
};
