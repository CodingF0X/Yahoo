const express = require('express')
const router = express.Router()
const requireAuth = require('../Middleware/requireAuth')
const AdminController = require('../Controllers/AdminController')
 

//-- GET ALL USERS --//
router.get('/',requireAuth, AdminController.getAllUsers)

//-- DELETE A USER --//
router.delete('/:id',requireAuth,AdminController.deleteUser)

//-- TOGGLE MODERATOR --//
router.put('/:id',requireAuth, AdminController.toggleModerator)





module.exports = router