const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const requireAuth = require('../Middleware/requireAuth')


//-- GET ALL USERS --//
router.get('/',userController.getAllUsers)
//-- GET A USER --//
router.get('/:id',userController.getSingleUser)
//-- UPDATE A USER --//
router.put('/:id',requireAuth,userController.updateUser)
//-- DELETE A USER --//
router.delete('/:id',requireAuth,userController.deleteUser)
//-- TOGGLE MODERATOR --//
// router.put('/:id_admin', userController.toggleModerator)

//-- FRIENDS LIST --//
router.get("/:id/friends",userController.getUserFriends);

//-- ADD REMOVE FRIENDS --//
router.patch("/:id/:friendId",requireAuth, userController.addRemoveFriends);




module.exports = router