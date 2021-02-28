const express = require('express')
const router = express.Router()
const userController = require('./user-controller.js')

router.get('/user', userController.index)

module.exports = router