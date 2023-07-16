const express = require('express');
const router = express.Router();
const groupContoller = require('../controllers/groupController');

// router.post('/sendTest', testController.sendTest);
router.get('/getGroups', groupContoller.fetchGroup);
router.post('/createGroups',groupContoller.createGroup);

module.exports = router;