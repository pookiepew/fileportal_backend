const Lane = require('../models/Lane');
const HttpError = require('../models/HttpError');

const db = require('../db/index');

const create = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    await db.laneAlreadyExists(name, Lane);
    const lane = await db.createNewLane(name, userId, Lane);
    res.status(201).json(lane);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  const { name } = req.query;
  try {
    const lane = await db.findLaneByName(name, Lane, HttpError);
    res.json(lane);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findOne,
};
