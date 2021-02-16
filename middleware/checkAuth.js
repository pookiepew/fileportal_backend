const jwt = require('jsonwebtoken');

const config = require('../config');

const HttpError = require('../models/HttpError');

const decodeJwtToken = require('../functions/decodeJwtToken');

module.exports = checkAuth = async (req, res, next) => {
  let token;
  const bearer = req.header('Authorization');
  if (bearer) token = bearer.split(' ')[1];
  if (!token) {
    const error = new HttpError('Authorization denied', 401);
    return next(error);
  }
  try {
    const decodedToken = await decodeJwtToken(token, jwt, config);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    next(err);
  }
};
