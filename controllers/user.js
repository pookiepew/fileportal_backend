const HttpError = require('../models/HttpError');

const login = async (req, res, next) => {
  console.log(req.body);
  res.json({ msg: 'worked' });
};

module.exports = {
  login
};
