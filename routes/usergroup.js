const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const userGroup = require('../controllers/userGroup')

const router = express.Router();

router.post('/create', checkAuth, userGroup.create)

router.get('/find-one', checkAuth, userGroup.findOne)

router.get('/find-all', checkAuth, userGroup.findAll)

module.exports = router;