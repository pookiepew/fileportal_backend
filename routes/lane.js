const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const lane = require('../controllers/lane');

const router = express.Router();

router.post('/create', checkAuth, lane.create);

router.get('/find-one', checkAuth, lane.findOne);

module.exports = router;
