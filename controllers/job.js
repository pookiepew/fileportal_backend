const db = require('../db');

const Job = require('../models/Job');
const Trip = require('../models/Trip');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { jobNumber, tripNumber, info = '' } = req.body;
  const userId = req.user.id;
  if (!tripNumber) {
    const error = new HttpError('tripnumber are missing', 400);
    return next(error);
  }
  if (!SRG_number && !LUB_number) {
    const error = new HttpError('A job number must be provided', 400);
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

const findOne = async (req, res, next) => {
  const { company, jobNumber } = req.query;
  if (!company || !jobNumber) {
    const error = new HttpError('A company and jobnumber must be provided', 400);
    return next(error);
  }
  try {
    const job = await db.findJobByNumber(company, jobNumber, Job, HttpError);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findOne
};
