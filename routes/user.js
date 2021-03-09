const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const user = require('../controllers/user');

const router = express.Router();

router.post('/login', user.login);

router.post('/register', checkAuth, user.register);

router.post('/invite', checkAuth, user.invite);

router.post('/accept-invite', checkAuth, user.acceptInvite);

router.post('/new-invite-token', user.generateNewInviteToken);

module.exports = router;