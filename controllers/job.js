const db = require('../db');

const Job = require('../models/Job');
const Trip = require('../models/Trip');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { jobNumber, tripNumber, info = '' } = req.body;
  const userId = req.user.id;
  if (!jobNumber || !tripNumber) {
    const error = new HttpError('Job- or trip number are missing', 400);
    return next(error);
  }
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  try {
    if (await db.jobAlreadyExists(jobNumber, Job)) {
      const error = new HttpError('Job already exists', 200);
      return next(error);
    }
    const job = await db.createNewJob(jobNumber, tripNumber, info, userId, Job);
    await db.addJobToTrip(tripNumber, job._id, Trip);
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
    const job = await db.findJobByNumber(number, Job, HttpError);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  find
};
