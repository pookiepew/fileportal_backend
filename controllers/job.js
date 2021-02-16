const db = require('../db');

const Job = require('../models/Job');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { number, trip, creator } = req.body;
  if (!number || !trip || !creator) {
    const error = new HttoError('Number, trip or creator missing', 400);
    return next(error);
  }
  try {
    const job = await db.createNewJob(number, trip, creator, Job);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
