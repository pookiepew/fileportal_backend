const db = require('../db');

const Job = require('../models/Job');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { number, trip } = req.body;
  const userId = req.user.id;
  if (!number || !trip) {
    const error = new HttpError('Number or trip missing', 400);
    return next(error);
  }
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  try {
    const job = await db.createNewJob(number, trip, userId, Job);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  const { number } = req.query;
  if (!number) {
    const error = new HttpError('No job number provided', 400);
    return next(error);
  }
  try {
    const job = await db.findJobByNumber(number, Job);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  find,
};
