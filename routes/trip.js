const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const trip = require('../controllers/trip');

const router = express.Router();

router.post('/create', checkAuth, trip.create);

router.get('/find', checkAuth, trip.find);

module.exports = router;