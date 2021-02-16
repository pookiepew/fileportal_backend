const express = require('express');

const user = require('./controllers/user');

const file = require('./controllers/file');

const trip = require('./controllers/trip');

const job = require('./controllers/job');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(res);
  res.json({ msg: '/' });
});

router.post('/user/register', user.register);

router.post('/user/login', user.login);

router.post('/file/upload', file.upload);

router.post('/trip/create', trip.create);

router.get('/trip/find', trip.find);

router.post('/job/create', job.create);

router.get('/job/find', job.find);

module.exports = router;
