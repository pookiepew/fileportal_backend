const express = require('express');

const user = require('./controllers/user');

const file = require('./controllers/file');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(res);
  res.json({ msg: '/' });
});

router.post('/user/register', user.register);

router.post('/user/login', user.login);

router.post('/file/upload', file.upload);

module.exports = router;
