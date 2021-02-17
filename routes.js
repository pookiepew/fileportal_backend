const express = require('express');

const checkAuth = require('./middleware/checkAuth');

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

router.post('/user/invite', checkAuth, user.invite);

router.post('/user/accept-invite', checkAuth, user.acceptInvite);

router.post('/user/new-invite-token', user.generateNewInviteToken);

router.post('/file/upload', checkAuth, file.upload);

router.post('/trip/create', checkAuth, trip.create);

router.get('/trip/find', checkAuth, trip.find);

router.post('/job/create', checkAuth, job.create);

router.get('/job/find', checkAuth, job.find);

module.exports = router;
