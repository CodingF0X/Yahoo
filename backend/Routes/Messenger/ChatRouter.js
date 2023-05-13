const express = require('express')
const router = express.Router()
const chatController = require('../../Controllers/Messenger/chatController.js')
const { createMessage, getMessagesByChat } = require('../../Controllers/Messenger/messageController.js')
const requireAuth = require('../../Middleware/requireAuth.js')


//-- CREATE NEW CHAT --//
router.post('/', requireAuth, chatController.createChat)

//-- GET ALL CHATS --//
router.get('/',requireAuth,chatController.getAllChats)

//-- GET SINGLE CHAT --//
router.get('/:userId',requireAuth,chatController.getSingleChat)

//-- SEND MESSAGE --//
router.post('/message',requireAuth,createMessage)

//-- GET ALL MESSAGES --//
router.get('/message/:chatId',requireAuth,getMessagesByChat)

module.exports = router