const express = require('express');

// const user = require('../controllers/user');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(res);
  res.json({ msg: '/' });
});

module.exports = router;
