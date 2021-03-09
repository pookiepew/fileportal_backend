const UserGroup = require("../models/UserGroup");
const HttpError = require("../models/HttpError");

const db = require("../db/index");

const create = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;
  if (!userId) {
    const error = new HttpError("Not authorized", 401);
    return next(error);
  }
  if (!name) {
    const error = new HttpError("Usergroup Name not provided", 400);
    return next(error);
  }
  try {
    const existingGroup = await UserGroup.findOne({ name });
    if (existingGroup) {
      const error = new HttpError("Usergroup already exists", 400);
      return next(error);
    }
    const newUserGroup = await db.createUserGroup(name, userId, UserGroup);
    res.status(201).json(newUserGroup)
  } catch (error) {
    next(error)
  }
};

const findAll = async (req, res, next) => {
  try {
    const userGroups = await UserGroup.find().populate({ path: 'users', select: '-password' })
    res.json(userGroups)
  } catch (err) {
    next(err)
  }
}

const findOne = async (req, res, next) => {
  try {
    const { name } = req.query
    if( !name ) {
      const error = new HttpError('Name not provided', 400)
      return next(error)
    }
    const userGroup = await UserGroup.findOne({ name }).populate({ path: 'users', select: '-password' })
    res.json(userGroup)
  } catch (err) {
    next(err)
  }
}

module.exports = { 
  create,
  findOne,
  findAll
};
