const express = require('express');

const checkAuth = require('../middleware/checkAuth');

const file = require('../controllers/file');

const router = express.Router();

router.post('/upload', checkAuth, file.upload);

module.exports = router;