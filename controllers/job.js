const db = require('../db');

const Job = require('../models/Job');
const Trip = require('../models/Trip');
const HttpError = require('../models/HttpError');

const create = async (req, res, next) => {
  const { job } = req.body;
  const userId = req.user.id;
  try {
    await db.jobAlreadyExists(job.numbers, Job, HttpError);
    const newJob = await db.createNewJob(job, userId, Job);
    await db.addJobToTrip(job.trip, newJob._id, Trip);
    res.status(201).json(newJob);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  const { company, jobNumber } = req.query;
  if (!company || !jobNumber) {
    const error = new HttpError(
      'A company and jobnumber must be provided',
      400
    );
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
  findOne,
};
