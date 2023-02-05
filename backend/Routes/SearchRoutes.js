const express = require('express')
const { searchFilter } = require('../Controllers/SearchController')
const requireAuth = require('../Middleware/requireAuth')
const router = express.Router()



router.post(`/search`,requireAuth,searchFilter)


module.exports = router