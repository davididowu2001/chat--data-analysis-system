const express = require('express');
const router = express.Router();
const usersContoller = require('../controllers/usersController');

// router.post('/sendTest', testController.sendTest);
router.get('/getUsers', usersContoller.fetchUsers);

module.exports = router;