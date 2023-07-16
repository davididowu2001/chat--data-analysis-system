const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const chatController = require('../controllers/chatController');

router.get('/get_user_info', chatController.getUserInfo);

/* router.get('/get_login', chatController.getLogin); */
/* router.get('/get_chats', chatController.getChats);
router.get('/get_read_chats', chatController.getReadChats);
router.get('/get_alphabetical_chats', chatController.getAlphaChats);
router.get('/insert_chat', chatController.insertChat);
router.get('/delete_chat', chatController.deleteChat); */

router.get('/getdirectMessages', messagesController.fetchDirectMessages);
router.post('/senddirectMessages', messagesController.sendDirectMessages);
router.post('/sendgroupMessages',messagesController.sendGroupMessages);
router.get('/fetchgroupMessages',messagesController.fetchGroupMessages);
module.exports = router;
