const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const job = require('../controllers/job');

const router = express.Router();

router.post('/create', checkAuth, job.create);

router.get('/find', checkAuth, job.find);

module.exports = router;