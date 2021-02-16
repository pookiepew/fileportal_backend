const db = require('../db');

const Job = require('../models/Job');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { number, trip, creator } = req.body; //creator from auth later
  if (!number || !trip || !creator) {
    const error = new HttpError('Number, trip or creator missing', 400);
    return next(error);
  }
  try {
    const job = await db.createNewJob(number, trip, creator, Job);
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
