const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const user = require('../controllers/user');

const router = express.Router();

router.post('/login', user.login);

router.post('/register', checkAuth, user.register);

router.post('/invite', checkAuth, user.invite);

router.post('/accept-invite', checkAuth, user.acceptInvite);

router.post('/new-invite-token', user.generateNewInviteToken);

router.put('/update', checkAuth, user.update);

router.get('/find-all', checkAuth, user.findAll);

module.exports = router;
