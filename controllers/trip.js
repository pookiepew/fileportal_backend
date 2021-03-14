const Trip = require('../models/Trip');
const Lane = require('../models/Lane');
const HttpError = require('../models/HttpError');

const db = require('../db/index');

const create = async (req, res, next) => {
  const { trip } = req.body;
  const userId = req.user.id;
  try {
    await db.fieldsAreMissing(trip, HttpError);
    await db.tripAlreadyExists(trip.numbers, Trip, HttpError);
    const lane = await db.findLaneByName(trip.lane, Lane, HttpError);
    const newTrip = await db.createNewTrip(trip, userId, lane, Trip);
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  const { number } = req.query;
  // if (!number) {
  //   const error = new HttpError('No trip number provided', 400);
  //   return next(error);
  // }
  try {
    const trip = await db.findTripByNumber(number, Trip, HttpError);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findOne,
};
