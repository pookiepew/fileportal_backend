const Trip = require('../models/Trip');

const HttpError = require('../models/HttpError');

const db = require('../db/index');

const create = async (req, res, next) => {
  const { tripNumber, creatorID } = req.body; // creator from auth later
  if (!tripNumber) {
    const error = new HttpError('No trip number provided', 400);
    return next(error);
  }
  try {
    const newTrip = await db.createNewTrip(tripNumber, creatorID, Trip);
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
    const trip = await db.findTripByNumber(number, Trip);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  find,
};
