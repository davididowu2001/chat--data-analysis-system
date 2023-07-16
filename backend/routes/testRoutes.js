const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/sendTest', testController.sendTest);
router.get('/getTest', testController.getTest);

module.exports = router;
