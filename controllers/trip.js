const Trip = require('../models/Trip');

const HttpError = require('../models/HttpError');

const db = require('../db/index');

const create = async (req, res, next) => {
  const { tripNumber } = req.body;
  const userId = req.user.id;
  if (!tripNumber) {
    const error = new HttpError('No trip number provided', 400);
    return next(error);
  }
  if (!userId) {
    const error = new HttpError('Not authorized', 401);
    return next(error);
  }
  try {
    if (await db.tripAlreadyExists(tripNumber, Trip)) {
      const error = new HttpError('Trip already exists', 200);
      return next(error);
    }
    const newTrip = await db.createNewTrip(tripNumber, userId, Trip, HttpError);
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
  find
};
