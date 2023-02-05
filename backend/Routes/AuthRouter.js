const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')

//-- REGISTER USER --//
router.post('/signup',authController.createUser)

//-- USER LOGIN --//
router.post('/signin',authController.userLogin)


module.exports=router
