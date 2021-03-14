const Trip = require('../models/Trip');

const HttpError = require('../models/HttpError');

const db = require('../db/index');

const create = async (req, res, next) => {
  const { trip } = req.body;
  const userId = req.user.id;
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  try {
    await db.fieldsAreMissing(trip);
    if (await db.tripAlreadyExists(numbers, Trip)) {
      const error = new HttpError('Trip already exists', 200);
      return next(error);
    }
    const newTrip = await db.createNewTrip(numbers, userId, Trip, HttpError);
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  const { number } = req.query;
  if (!number) {
    const error = new HttpError('No trip number provided', 400);
    return next(error);
  }
  try {
    const trip = await db.findTripByNumber(number, Trip, HttpError);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  find,
};
